from __future__ import annotations

import os
from pathlib import Path
from typing import Any, Optional

from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, Response

from . import db as dbmod
from .config import ensure_dirs, get_paths
from .face_detection import JobRegistry, start_detection_job
from .live_faces import detect_faces_at_time
from .range_response import range_file_response
from .timeutil import now_utc_iso
from .videos import new_video_row, probe_video, store_upload_stream


paths = get_paths()
ensure_dirs()
os.chdir(str(paths.root))  # ensure face_detect relative model paths resolve

conn = dbmod.connect(paths.db_path)
dbmod.init_db(conn)

jobs = JobRegistry()

app = FastAPI(title="Face Detection API")

# Local-network dashboard; keep CORS permissive for now.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, bool]:
    return {"ok": True}


@app.get("/api/settings")
def get_settings() -> dict[str, Any]:
    row = conn.execute(
        "SELECT capture_new_person, existing_capture_interval_minutes, max_images_per_person, sample_fps FROM settings WHERE id=1"
    ).fetchone()
    return {
        "capture_new_person": bool(row["capture_new_person"]),
        "existing_capture_interval_minutes": int(row["existing_capture_interval_minutes"]),
        "max_images_per_person": int(row["max_images_per_person"]),
        "sample_fps": float(row["sample_fps"]),
    }


@app.get("/api/storage/status")
def storage_status() -> dict[str, Any]:
    import shutil

    usage = shutil.disk_usage(paths.data_dir)
    return {
        "data_dir": str(paths.data_dir),
        "total_bytes": int(usage.total),
        "used_bytes": int(usage.used),
        "free_bytes": int(usage.free),
    }


@app.put("/api/settings")
def update_settings(payload: dict[str, Any]) -> dict[str, Any]:
    capture_new_person = 1 if bool(payload.get("capture_new_person", True)) else 0
    existing = int(payload.get("existing_capture_interval_minutes", 10))
    max_imgs = int(payload.get("max_images_per_person", 40))
    sample_fps = float(payload.get("sample_fps", 2.0))

    if existing < 0:
        raise HTTPException(status_code=400, detail="existing_capture_interval_minutes must be >= 0")
    if max_imgs < 1:
        raise HTTPException(status_code=400, detail="max_images_per_person must be >= 1")
    if sample_fps <= 0:
        raise HTTPException(status_code=400, detail="sample_fps must be > 0")

    with dbmod.tx(conn) as cur:
        cur.execute(
            """
            UPDATE settings
            SET capture_new_person = ?,
                existing_capture_interval_minutes = ?,
                max_images_per_person = ?,
                sample_fps = ?
            WHERE id = 1
            """,
            (capture_new_person, existing, max_imgs, sample_fps),
        )
    return get_settings()


@app.get("/api/videos")
def list_videos() -> dict[str, Any]:
    rows = conn.execute("SELECT * FROM videos ORDER BY uploaded_at DESC").fetchall()
    return {"videos": [dict(r) for r in rows]}


@app.post("/api/videos")
async def upload_video(file: UploadFile = File(...)) -> dict[str, Any]:
    if not file.filename:
        raise HTTPException(status_code=400, detail="missing filename")

    try:
        stored_name, out_path = await store_upload_stream(paths.videos_dir, file.filename, file)
    except OSError as e:
        if getattr(e, "errno", None) == 28:
            raise HTTPException(
                status_code=507,
                detail="No space left on device while uploading. Free disk space or move storage to a larger mount.",
            )
        raise
    if out_path.stat().st_size <= 0:
        raise HTTPException(status_code=400, detail="empty file")
    meta = probe_video(out_path)
    row = new_video_row(file.filename, stored_name, meta)

    with dbmod.tx(conn) as cur:
        cur.execute(
            """
            INSERT INTO videos (original_name, stored_name, uploaded_at, duration_sec, width, height, fps)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                row["original_name"],
                row["stored_name"],
                row["uploaded_at"],
                row["duration_sec"],
                row["width"],
                row["height"],
                row["fps"],
            ),
        )
        video_id = int(cur.lastrowid)

    return {"video": {"id": video_id, **row}}


@app.post("/api/videos/raw")
async def upload_video_raw(request: Request, filename: str = "video.mp4") -> dict[str, Any]:
    """
    Raw upload path to avoid multipart parsing failures for large files / low disk.
    The frontend uses this endpoint for reliable uploads with progress.
    """
    from uuid import uuid4
    import os as _os

    # Drop any client path fragments.
    original_name = Path(str(filename)).name or "video.mp4"
    _, ext = _os.path.splitext(original_name)
    ext = (ext or "").lower()
    if not ext or len(ext) > 10:
        ext = ".mp4"

    stored_name = f"{uuid4().hex}{ext}"
    out_path = paths.videos_dir / stored_name

    try:
        with out_path.open("wb") as f:
            async for chunk in request.stream():
                if not chunk:
                    continue
                f.write(chunk)
    except OSError as e:
        try:
            out_path.unlink(missing_ok=True)
        except Exception:
            pass
        if getattr(e, "errno", None) == 28:
            raise HTTPException(
                status_code=507,
                detail="No space left on device while uploading. Free disk space or move storage to a larger mount.",
            )
        raise

    if out_path.stat().st_size <= 0:
        try:
            out_path.unlink(missing_ok=True)
        except Exception:
            pass
        raise HTTPException(status_code=400, detail="empty file")

    meta = probe_video(out_path)
    row = new_video_row(original_name, stored_name, meta)

    with dbmod.tx(conn) as cur:
        cur.execute(
            """
            INSERT INTO videos (original_name, stored_name, uploaded_at, duration_sec, width, height, fps)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                row["original_name"],
                row["stored_name"],
                row["uploaded_at"],
                row["duration_sec"],
                row["width"],
                row["height"],
                row["fps"],
            ),
        )
        video_id = int(cur.lastrowid)

    return {"video": {"id": video_id, **row}}


@app.put("/api/videos/{video_id}")
async def replace_video(video_id: int, file: UploadFile = File(...)) -> dict[str, Any]:
    existing = conn.execute("SELECT * FROM videos WHERE id = ?", (video_id,)).fetchone()
    if not existing:
        raise HTTPException(status_code=404, detail="video not found")

    # Store a new file and swap the DB record; delete old file best-effort.
    try:
        stored_name, out_path = await store_upload_stream(
            paths.videos_dir,
            file.filename or existing["original_name"],
            file,
        )
    except OSError as e:
        if getattr(e, "errno", None) == 28:
            raise HTTPException(
                status_code=507,
                detail="No space left on device while uploading. Free disk space or move storage to a larger mount.",
            )
        raise
    if out_path.stat().st_size <= 0:
        raise HTTPException(status_code=400, detail="empty file")
    meta = probe_video(out_path)

    with dbmod.tx(conn) as cur:
        cur.execute(
            """
            UPDATE videos
            SET original_name = ?, stored_name = ?, uploaded_at = ?, duration_sec = ?, width = ?, height = ?, fps = ?
            WHERE id = ?
            """,
            (
                file.filename or existing["original_name"],
                stored_name,
                now_utc_iso(),
                meta.get("duration_sec"),
                meta.get("width"),
                meta.get("height"),
                meta.get("fps"),
                video_id,
            ),
        )

    try:
        Path(paths.videos_dir / existing["stored_name"]).unlink(missing_ok=True)
    except Exception:
        pass

    return {"ok": True}


@app.delete("/api/videos/{video_id}")
def delete_video(video_id: int) -> dict[str, Any]:
    row = conn.execute("SELECT stored_name FROM videos WHERE id = ?", (video_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="video not found")

    stored = row["stored_name"]
    with dbmod.tx(conn) as cur:
        cur.execute("DELETE FROM videos WHERE id = ?", (video_id,))

    try:
        (paths.videos_dir / stored).unlink(missing_ok=True)
    except Exception:
        pass

    return {"ok": True}


@app.get("/api/videos/{video_id}/file")
def get_video_file(video_id: int, request: Request):
    row = conn.execute("SELECT stored_name FROM videos WHERE id = ?", (video_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="video not found")

    path = paths.videos_dir / row["stored_name"]
    if not path.exists():
        raise HTTPException(status_code=404, detail="file missing on disk")

    return range_file_response(path, request)


@app.head("/api/videos/{video_id}/file")
def head_video_file(video_id: int, request: Request):
    # Some browsers probe with HEAD before GET; support it to prevent "failed to fetch".
    row = conn.execute("SELECT stored_name FROM videos WHERE id = ?", (video_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="video not found")

    path = paths.videos_dir / row["stored_name"]
    if not path.exists():
        raise HTTPException(status_code=404, detail="file missing on disk")

    size = path.stat().st_size
    from .videos import guess_mime

    return Response(
        status_code=200,
        media_type=guess_mime(path),
        headers={
            "Accept-Ranges": "bytes",
            "Content-Length": str(size),
            "Cache-Control": "no-store",
        },
    )


@app.post("/api/videos/{video_id}/detect")
def detect_faces(video_id: int) -> dict[str, Any]:
    row = conn.execute("SELECT stored_name FROM videos WHERE id = ?", (video_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="video not found")

    video_path = paths.videos_dir / row["stored_name"]
    job_id = start_detection_job(conn=conn, registry=jobs, video_id=video_id, video_path=video_path, faces_dir=paths.faces_dir)
    return {"job_id": job_id}


@app.get("/api/jobs/{job_id}")
def job_status(job_id: str) -> dict[str, Any]:
    d = jobs.as_dict(job_id)
    if not d:
        raise HTTPException(status_code=404, detail="job not found")
    return d


@app.get("/api/videos/{video_id}/detections")
def get_detections(video_id: int, t0: Optional[float] = None, t1: Optional[float] = None) -> dict[str, Any]:
    params: list[Any] = [video_id]
    where = "video_id = ?"
    if t0 is not None:
        where += " AND t_sec >= ?"
        params.append(float(t0))
    if t1 is not None:
        where += " AND t_sec <= ?"
        params.append(float(t1))

    rows = conn.execute(
        f"SELECT video_id, t_sec, x, y, w, h, person_id, score FROM detections WHERE {where} ORDER BY t_sec ASC",
        tuple(params),
    ).fetchall()
    return {"detections": [dict(r) for r in rows]}


@app.get("/api/videos/{video_id}/faces")
def live_faces(video_id: int, t: float) -> dict[str, Any]:
    """
    Step 1 (live overlay): detect faces for a single timestamp in the video.
    This does NOT save persons/images; it only returns boxes for drawing overlays.
    """
    row = conn.execute("SELECT stored_name FROM videos WHERE id = ?", (video_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="video not found")
    video_path = paths.videos_dir / row["stored_name"]
    if not video_path.exists():
        raise HTTPException(status_code=404, detail="file missing on disk")

    faces = detect_faces_at_time(video_path=video_path, t_sec=float(t))
    return {
        "t": float(t),
        "faces": [{"x": f.x, "y": f.y, "w": f.w, "h": f.h, "score": f.score} for f in faces],
    }


@app.get("/api/persons")
def list_persons() -> dict[str, Any]:
    rows = conn.execute(
        """
        SELECT p.id, p.codename, p.last_seen,
               (SELECT path FROM face_images fi WHERE fi.person_id = p.id ORDER BY fi.captured_at DESC LIMIT 1) AS thumbnail_path,
               (SELECT COUNT(1) FROM face_images fi2 WHERE fi2.person_id = p.id) AS image_count
        FROM persons p
        ORDER BY COALESCE(p.last_seen, p.created_at) DESC
        """
    ).fetchall()
    people = []
    for r in rows:
        d = dict(r)
        d["thumbnail_url"] = f"/api/persons/{d['id']}/thumbnail"
        people.append(d)
    return {"persons": people}


@app.get("/api/persons/{person_id}/thumbnail")
def get_thumbnail(person_id: int):
    row = conn.execute(
        "SELECT path FROM face_images WHERE person_id = ? ORDER BY captured_at DESC LIMIT 1",
        (person_id,),
    ).fetchone()
    if not row:
        # Use a 1x1 placeholder to keep the UI simple.
        return JSONResponse(status_code=404, content={"detail": "no images"})

    p = Path(row["path"])
    if not p.exists():
        raise HTTPException(status_code=404, detail="file missing on disk")
    return FileResponse(str(p), headers={"Cache-Control": "no-store"})


@app.get("/api/persons/{person_id}/images")
def list_person_images(person_id: int) -> dict[str, Any]:
    rows = conn.execute(
        "SELECT id, captured_at, path FROM face_images WHERE person_id = ? ORDER BY captured_at DESC",
        (person_id,),
    ).fetchall()
    images = []
    for r in rows:
        rid = int(r["id"])
        images.append(
            {
                "id": rid,
                "captured_at": r["captured_at"],
                "url": f"/api/face-images/{rid}/file",
            }
        )
    return {"images": images}


@app.get("/api/face-images/{image_id}/file")
def get_face_image_file(image_id: int):
    row = conn.execute("SELECT path FROM face_images WHERE id = ?", (image_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="image not found")
    p = Path(row["path"])
    if not p.exists():
        raise HTTPException(status_code=404, detail="file missing on disk")
    return FileResponse(str(p), headers={"Cache-Control": "no-store"})


@app.post("/api/admin/clear-faces")
def clear_faces() -> dict[str, Any]:
    """
    Clears captured persons + images + detections (keeps uploaded videos).
    """
    import shutil

    # Delete files on disk first.
    try:
        if paths.faces_dir.exists():
            shutil.rmtree(paths.faces_dir)
    except Exception:
        # Best-effort; DB cleanup still proceeds.
        pass
    ensure_dirs()

    with dbmod.tx(conn) as cur:
        cur.execute("DELETE FROM detections")
        cur.execute("DELETE FROM face_images")
        cur.execute("DELETE FROM persons")

    return {"ok": True}
