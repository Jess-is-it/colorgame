import { useEffect, useMemo, useRef, useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import {
  API_BASE_URL,
  deleteVideo,
  getHealth,
  getStorageStatus,
  listVideos,
  getLiveFaces,
  uploadVideoWithProgress,
  videoFileUrl,
  type LiveFaceBox,
  type VideoRow,
} from 'src/lib/faceApi';

function fmtIso(iso?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export default function FaceDetection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const pollRef = useRef<number | null>(null);
  const inFlightRef = useRef<boolean>(false);

  const [healthOk, setHealthOk] = useState<boolean>(false);
  const [healthErr, setHealthErr] = useState<string>('');

  const [videos, setVideos] = useState<VideoRow[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
  const selectedVideo = useMemo(
    () => videos.find((v) => v.id === selectedVideoId) || null,
    [videos, selectedVideoId],
  );

  const [uploading, setUploading] = useState<boolean>(false);
  const [videoUploadErr, setVideoUploadErr] = useState<string>('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPct, setUploadPct] = useState<number>(0);
  const [uploadBytes, setUploadBytes] = useState<{ loaded: number; total?: number }>({ loaded: 0 });

  const [storage, setStorage] = useState<{ free_bytes: number; total_bytes: number; data_dir: string } | null>(null);

  // Step 1: live overlay only (no saving).
  const [liveBoxes, setLiveBoxes] = useState<LiveFaceBox[]>([]);
  const [liveEnabled, setLiveEnabled] = useState<boolean>(true);
  const [liveErr, setLiveErr] = useState<string>('');
  const [liveLastAt, setLiveLastAt] = useState<number>(0);
  const [liveFps, setLiveFps] = useState<number>(12);

  async function refreshAll() {
    try {
      const h = await getHealth();
      setHealthOk(!!h.ok);
      setHealthErr('');
    } catch (e: any) {
      setHealthOk(false);
      setHealthErr(String(e?.message || e || 'backend offline'));
    }

    try {
      const v = await listVideos();
      setVideos(v);
      setVideoUploadErr('');
      if (!selectedVideoId && v.length) setSelectedVideoId(v[0].id);
      if (selectedVideoId && !v.some((x) => x.id === selectedVideoId)) {
        setSelectedVideoId(v[0]?.id ?? null);
      }
    } catch (e: any) {
      setVideoUploadErr(String(e?.message || e || 'failed to load videos'));
    }

    try {
      const st = await getStorageStatus();
      setStorage(st);
    } catch (_) {
      // Non-critical.
    }
  }

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure the canvas tracks the rendered video size.
  function syncCanvasSize() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const rect = video.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
  }

  function drawOverlay() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    syncCanvasSize();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!liveBoxes.length || !video.videoWidth || !video.videoHeight) return;

    const sx = canvas.width / video.videoWidth;
    const sy = canvas.height / video.videoHeight;

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(239,68,68,0.95)'; // red-500 (high contrast)
    ctx.fillStyle = 'rgba(239,68,68,0.10)';

    for (const b of liveBoxes) {
      const x = b.x * sx;
      const y = b.y * sy;
      const w = b.w * sx;
      const h = b.h * sy;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
    }
  }

  function clearOverlay() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  async function pollOnce() {
    if (!liveEnabled) return;
    if (!selectedVideoId) return;
    const v = videoRef.current;
    if (!v) return;
    if (v.paused || v.ended) return;
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    try {
      const boxes = await getLiveFaces(selectedVideoId, v.currentTime);
      setLiveBoxes(boxes);
      setLiveLastAt(Date.now());
      setLiveErr('');
      // Draw immediately after updating.
      window.requestAnimationFrame(() => drawOverlay());
    } catch (e: any) {
      setLiveErr(String(e?.message || e || 'live detect failed'));
    } finally {
      inFlightRef.current = false;
    }
  }

  function startPolling() {
    if (pollRef.current) return;
    const intervalMs = Math.max(100, Math.round(1000 / Math.max(1, liveFps)));
    pollRef.current = window.setInterval(() => {
      pollOnce();
    }, intervalMs);
  }

  function stopPolling() {
    if (pollRef.current) window.clearInterval(pollRef.current);
    pollRef.current = null;
    inFlightRef.current = false;
    setLiveBoxes([]);
    clearOverlay();
  }

  async function onUploadVideo() {
    if (!uploadFile) return;
    setUploading(true);
    setVideoUploadErr('');
    setUploadPct(0);
    setUploadBytes({ loaded: 0, total: uploadFile.size });
    try {
      const v = await uploadVideoWithProgress(uploadFile, (p) => {
        setUploadBytes({ loaded: p.loaded, total: p.total });
        if (typeof p.pct === 'number' && isFinite(p.pct)) setUploadPct(Math.max(0, Math.min(100, p.pct)));
      });
      const next = await listVideos();
      setVideos(next);
      setSelectedVideoId(v.id);
      setUploadFile(null);
      if (uploadInputRef.current) uploadInputRef.current.value = '';
    } catch (e: any) {
      setVideoUploadErr(String(e?.message || e || 'upload failed'));
    } finally {
      setUploading(false);
    }
  }

  async function onDeleteVideoRow(videoId: number) {
    if (!window.confirm('Delete this video?')) return;
    setUploading(true);
    setVideoUploadErr('');
    try {
      await deleteVideo(videoId);
      const next = await listVideos();
      setVideos(next);
      if (selectedVideoId === videoId) {
        setSelectedVideoId(next[0]?.id ?? null);
        stopPolling();
      }
    } catch (e: any) {
      setVideoUploadErr(String(e?.message || e || 'delete failed'));
    } finally {
      setUploading(false);
    }
  }

  function playPause() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  function restartVideo() {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }

  const backendBadge = healthOk ? (
    <Badge variant="success" className="px-3 py-1 text-sm">
      Backend Online
    </Badge>
  ) : (
    <Badge variant="error" className="px-3 py-1 text-sm">
      Backend Offline
    </Badge>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-dark dark:text-white">Face Detection</h1>
          <div className="text-sm text-darklink dark:text-darklink">
            Upload a video, then run face detection and review captured faces.
          </div>
          <div className="text-xs text-darklink dark:text-darklink mt-1">
            API base: <span className="font-mono">{API_BASE_URL}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">{backendBadge}</div>
      </div>

      {healthErr ? (
        <div className="text-sm text-error font-mono">{healthErr}</div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CardBox className="p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-ld">
              <div className="font-semibold text-dark dark:text-white">
                Video Player{selectedVideo ? ` - ${selectedVideo.original_name}` : ''}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={playPause} disabled={!selectedVideoId}>
                  Play / Pause
                </Button>
                <Button variant="outline" size="sm" onClick={restartVideo} disabled={!selectedVideoId}>
                  Restart
                </Button>
                <Button
                  size="sm"
                  variant={liveEnabled ? 'default' : 'outline'}
                  onClick={() => {
                    const next = !liveEnabled;
                    setLiveEnabled(next);
                    if (!next) stopPolling();
                  }}
                  disabled={!selectedVideoId}
                  title="Toggle live face rectangles"
                >
                  {liveEnabled ? 'Live Detect: ON' : 'Live Detect: OFF'}
                </Button>
              </div>
            </div>

            <div className="bg-black relative">
              {selectedVideoId ? (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-auto block"
                    src={videoFileUrl(selectedVideoId)}
                    onPlay={() => {
                      if (liveEnabled) startPolling();
                    }}
                    onPause={() => stopPolling()}
                    onEnded={() => stopPolling()}
                    onLoadedMetadata={() => {
                      syncCanvasSize();
                      clearOverlay();
                    }}
                    controls={false}
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute left-0 top-0 pointer-events-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                </>
              ) : (
                <div className="p-6 text-sm text-white/80">Upload or select a video to play.</div>
              )}
            </div>

            {liveErr ? <div className="px-5 py-3 text-xs text-error font-mono">{liveErr}</div> : null}
          </CardBox>

          <CardBox>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="font-semibold text-dark dark:text-white">Video Library</div>
              <div className="text-xs text-darklink dark:text-darklink">
                Select a video to play. You can upload multiple videos.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={uploadInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
              />
              <Button
                variant="outline"
                onClick={() => uploadInputRef.current?.click()}
                disabled={uploading}
              >
                Choose Video
              </Button>
              <div className="text-sm text-darklink dark:text-darklink min-w-[220px] truncate">
                {uploadFile ? uploadFile.name : 'No file selected'}
              </div>
              <Button onClick={onUploadVideo} disabled={!uploadFile || uploading}>
                {uploading ? 'Uploading...' : 'Add Video'}
              </Button>
            </div>

            {uploading ? (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-darklink dark:text-darklink">
                  <div className="font-mono">
                    {uploadBytes.total
                      ? `${Math.round(uploadBytes.loaded / 1024 / 1024)} / ${Math.round(uploadBytes.total / 1024 / 1024)} MB`
                      : `${Math.round(uploadBytes.loaded / 1024 / 1024)} MB`}
                  </div>
                  <div className="font-mono">{Math.round(uploadPct)}%</div>
                </div>
                <div className="mt-2 h-2 bg-lightgray dark:bg-darkgray rounded">
                  <div className="h-2 bg-primary rounded" style={{ width: `${Math.round(uploadPct)}%` }} />
                </div>
              </div>
            ) : null}

            {videoUploadErr ? <div className="mt-2 text-xs text-error font-mono">{videoUploadErr}</div> : null}

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-darklink dark:text-darklink border-b border-ld">
                    <th className="py-2 pr-3">ID</th>
                    <th className="py-2 pr-3">Name</th>
                    <th className="py-2 pr-3">Uploaded</th>
                    <th className="py-2 pr-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((v) => (
                    <tr key={v.id} className="border-b border-ld">
                      <td className="py-2 pr-3 font-mono">#{v.id}</td>
                      <td className="py-2 pr-3">{v.original_name}</td>
                      <td className="py-2 pr-3">{fmtIso(v.uploaded_at)}</td>
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={v.id === selectedVideoId ? 'default' : 'outline'}
                            onClick={() => setSelectedVideoId(v.id)}
                          >
                            {v.id === selectedVideoId ? 'Playing' : 'Play'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDeleteVideoRow(v.id)}
                            disabled={uploading}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!videos.length ? (
                    <tr>
                      <td colSpan={4} className="py-4 text-darklink dark:text-darklink">
                        No videos yet. Upload one above.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </CardBox>
        </div>

        <div className="space-y-6">
          <CardBox>
            <div className="font-semibold text-dark dark:text-white mb-4">Live Detection (Step 1)</div>
            <div className="space-y-3 text-sm">
              {storage ? (
                <div className="text-xs text-darklink dark:text-darklink">
                  Storage: <span className="font-mono">{Math.round(storage.free_bytes / 1024 / 1024)} MB</span> free
                </div>
              ) : null}

              <div className="text-xs text-darklink dark:text-darklink">
                Status:{' '}
                <span className="font-mono">
                  {liveEnabled ? 'enabled' : 'disabled'} / last update{' '}
                  {liveLastAt ? new Date(liveLastAt).toLocaleTimeString() : '(none)'}
                </span>
              </div>

              <label className="block">
                <div className="text-dark dark:text-white mb-1">Polling FPS</div>
                <input
                  className="w-full border border-ld rounded px-3 py-2 bg-white dark:bg-dark"
                  type="number"
                  min={1}
                  max={15}
                  value={liveFps}
                  onChange={(e) => {
                    const v = Number(e.target.value || 5);
                    setLiveFps(Math.max(1, Math.min(15, v)));
                    if (pollRef.current) {
                      stopPolling();
                      startPolling();
                    }
                  }}
                />
              </label>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (videoRef.current && !videoRef.current.paused && liveEnabled) pollOnce();
                  }}
                  disabled={!selectedVideoId}
                >
                  Test Now
                </Button>
              </div>
            </div>
          </CardBox>
        </div>
      </div>
    </div>
  );
}
