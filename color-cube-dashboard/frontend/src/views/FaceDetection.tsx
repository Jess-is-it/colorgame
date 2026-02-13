import { useEffect, useMemo, useRef, useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import {
  API_BASE_URL,
  apiUrl,
  deleteVideo,
  getDetections,
  getHealth,
  getJob,
  getSettings,
  getStorageStatus,
  listPersonImages,
  listPersons,
  listVideos,
  startDetection,
  updateSettings,
  uploadVideoWithProgress,
  videoFileUrl,
  type Detection,
  type PersonRow,
  type Settings,
  type VideoRow,
} from 'src/lib/faceApi';

function fmtIso(iso?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

function clamp01(n: number): number {
  if (!isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

type PersonImagesModalState = {
  open: boolean;
  person?: PersonRow;
  images: { id: number; captured_at: string; url: string }[];
  loading: boolean;
  error: string;
};

export default function FaceDetection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

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

  const [settings, setSettings] = useState<Settings | null>(null);
  const [settingsErr, setSettingsErr] = useState<string>('');
  const [savingSettings, setSavingSettings] = useState<boolean>(false);
  const [storage, setStorage] = useState<{ free_bytes: number; total_bytes: number; data_dir: string } | null>(null);

  const [people, setPeople] = useState<PersonRow[]>([]);
  const [peopleErr, setPeopleErr] = useState<string>('');

  const [detections, setDetections] = useState<Detection[]>([]);
  const [detecting, setDetecting] = useState<boolean>(false);
  const [jobId, setJobId] = useState<string>('');
  const [jobMsg, setJobMsg] = useState<string>('');
  const [jobProgress, setJobProgress] = useState<number>(0);
  const [detectErr, setDetectErr] = useState<string>('');

  const [modal, setModal] = useState<PersonImagesModalState>({
    open: false,
    images: [],
    loading: false,
    error: '',
  });

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
      const s = await getSettings();
      setSettings(s);
      setSettingsErr('');
    } catch (e: any) {
      setSettingsErr(String(e?.message || e || 'failed to load settings'));
    }

    try {
      const st = await getStorageStatus();
      setStorage(st);
    } catch (_) {
      // Non-critical.
    }

    try {
      const p = await listPersons();
      setPeople(p);
      setPeopleErr('');
    } catch (e: any) {
      setPeopleErr(String(e?.message || e || 'failed to load people'));
    }
  }

  useEffect(() => {
    refreshAll();
    const t = window.setInterval(() => {
      // Keep the table fresh while detection is running.
      listPersons().then(setPeople).catch(() => {});
    }, 4000);
    return () => window.clearInterval(t);
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
    if (!detections.length || !video.videoWidth || !video.videoHeight) return;

    const t = video.currentTime;
    const windowSec = 0.45;
    const relevant = detections.filter((d) => Math.abs(d.t_sec - t) <= windowSec);
    if (!relevant.length) return;

    const sx = canvas.width / video.videoWidth;
    const sy = canvas.height / video.videoHeight;

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(34,197,94,0.95)'; // green-500
    ctx.fillStyle = 'rgba(34,197,94,0.10)';

    for (const d of relevant) {
      const x = d.x * sx;
      const y = d.y * sy;
      const w = d.w * sx;
      const h = d.h * sy;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
    }
  }

  function startRaf() {
    if (rafRef.current) return;
    const tick = () => {
      drawOverlay();
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);
  }

  function stopRaf() {
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        setDetections([]);
        stopRaf();
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

  async function onDetect() {
    if (!selectedVideoId) return;
    setDetectErr('');
    setDetecting(true);
    setJobMsg('starting...');
    setJobProgress(0);
    try {
      const jid = await startDetection(selectedVideoId);
      setJobId(jid);

      // Poll job status.
      while (true) {
        const st = await getJob(jid);
        setJobMsg(st.message || st.state);
        setJobProgress(clamp01(st.progress));
        if (st.state === 'done') break;
        if (st.state === 'error') throw new Error(st.message || 'detection failed');
        await new Promise((r) => setTimeout(r, 800));
      }

      const det = await getDetections(selectedVideoId);
      setDetections(det);
      startRaf();

      const p = await listPersons();
      setPeople(p);
    } catch (e: any) {
      setDetectErr(String(e?.message || e || 'detect failed'));
    } finally {
      setDetecting(false);
    }
  }

  async function saveSettings() {
    if (!settings) return;
    setSavingSettings(true);
    setSettingsErr('');
    try {
      const s = await updateSettings(settings);
      setSettings(s);
    } catch (e: any) {
      setSettingsErr(String(e?.message || e || 'save failed'));
    } finally {
      setSavingSettings(false);
    }
  }

  async function openPerson(person: PersonRow) {
    setModal({ open: true, person, images: [], loading: true, error: '' });
    try {
      const imgs = await listPersonImages(person.id);
      setModal((m) => ({ ...m, images: imgs, loading: false, error: '' }));
    } catch (e: any) {
      setModal((m) => ({ ...m, loading: false, error: String(e?.message || e || 'failed') }));
    }
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
                <Button size="sm" onClick={onDetect} disabled={!selectedVideoId || detecting}>
                  {detecting ? 'Detecting...' : 'Detect Face'}
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
                    onPlay={startRaf}
                    onPause={stopRaf}
                    onLoadedMetadata={() => {
                      syncCanvasSize();
                      drawOverlay();
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

            {detectErr ? <div className="px-5 py-3 text-sm text-error font-mono">{detectErr}</div> : null}
            {detecting || jobId ? (
              <div className="px-5 py-3 text-xs text-darklink dark:text-darklink">
                <div className="flex items-center justify-between gap-3">
                  <div className="truncate">
                    Job: <span className="font-mono">{jobId || '(pending)'}</span> {jobMsg ? `- ${jobMsg}` : ''}
                  </div>
                  <div className="font-mono">{Math.round(jobProgress * 100)}%</div>
                </div>
                <div className="mt-2 h-2 bg-lightgray dark:bg-darkgray rounded">
                  <div
                    className="h-2 bg-primary rounded"
                    style={{ width: `${Math.round(jobProgress * 100)}%` }}
                  />
                </div>
              </div>
            ) : null}
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
            <div className="font-semibold text-dark dark:text-white mb-4">Settings</div>
            {settings ? (
              <div className="space-y-3 text-sm">
                {storage ? (
                  <div className="text-xs text-darklink dark:text-darklink">
                    Storage: <span className="font-mono">{Math.round(storage.free_bytes / 1024 / 1024)} MB</span>{' '}
                    free in <span className="font-mono">{storage.data_dir}</span>
                  </div>
                ) : null}
                <label className="block">
                  <div className="text-dark dark:text-white mb-1">Capture new person</div>
                  <select
                    className="w-full border border-ld rounded px-3 py-2 bg-white dark:bg-dark"
                    value={settings.capture_new_person ? '1' : '0'}
                    onChange={(e) =>
                      setSettings((s) => (s ? { ...s, capture_new_person: e.target.value === '1' } : s))
                    }
                  >
                    <option value="1">Auto capture</option>
                    <option value="0">Do not auto capture</option>
                  </select>
                </label>

                <label className="block">
                  <div className="text-dark dark:text-white mb-1">Capture interval (existing person, minutes)</div>
                  <input
                    className="w-full border border-ld rounded px-3 py-2 bg-white dark:bg-dark"
                    type="number"
                    min={0}
                    value={settings.existing_capture_interval_minutes}
                    onChange={(e) =>
                      setSettings((s) =>
                        s ? { ...s, existing_capture_interval_minutes: Number(e.target.value || 0) } : s,
                      )
                    }
                  />
                </label>

                <label className="block">
                  <div className="text-dark dark:text-white mb-1">Max photos per person</div>
                  <input
                    className="w-full border border-ld rounded px-3 py-2 bg-white dark:bg-dark"
                    type="number"
                    min={1}
                    value={settings.max_images_per_person}
                    onChange={(e) =>
                      setSettings((s) => (s ? { ...s, max_images_per_person: Number(e.target.value || 1) } : s))
                    }
                  />
                </label>

                <label className="block">
                  <div className="text-dark dark:text-white mb-1">Detection sampling FPS</div>
                  <input
                    className="w-full border border-ld rounded px-3 py-2 bg-white dark:bg-dark"
                    type="number"
                    min={0.25}
                    step={0.25}
                    value={settings.sample_fps}
                    onChange={(e) =>
                      setSettings((s) => (s ? { ...s, sample_fps: Number(e.target.value || 2) } : s))
                    }
                  />
                </label>

                <div className="flex items-center gap-2 pt-2">
                  <Button onClick={saveSettings} disabled={savingSettings}>
                    {savingSettings ? 'Saving...' : 'Save'}
                  </Button>
                  <Button variant="outline" onClick={refreshAll} disabled={savingSettings}>
                    Reload
                  </Button>
                </div>

                {settingsErr ? <div className="text-xs text-error font-mono">{settingsErr}</div> : null}
              </div>
            ) : (
              <div className="text-sm text-darklink dark:text-darklink">Loading settings...</div>
            )}
          </CardBox>

          <CardBox>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="font-semibold text-dark dark:text-white">Captured People</div>
              <Button variant="outline" size="sm" onClick={() => listPersons().then(setPeople).catch(() => {})}>
                Refresh
              </Button>
            </div>

            {peopleErr ? <div className="text-xs text-error font-mono mb-2">{peopleErr}</div> : null}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-darklink dark:text-darklink border-b border-ld">
                    <th className="py-2 pr-3">Picture</th>
                    <th className="py-2 pr-3">Codename</th>
                    <th className="py-2 pr-3">Last seen</th>
                    <th className="py-2 pr-3">#Images</th>
                    <th className="py-2 pr-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((p) => (
                    <tr key={p.id} className="border-b border-ld">
                      <td className="py-2 pr-3">
                        <img
                          src={apiUrl(p.thumbnail_url)}
                          className="w-12 h-12 object-cover rounded border border-ld bg-lightgray"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                          }}
                        />
                      </td>
                      <td className="py-2 pr-3 font-semibold">{p.codename}</td>
                      <td className="py-2 pr-3">{fmtIso(p.last_seen)}</td>
                      <td className="py-2 pr-3 font-mono">{p.image_count}</td>
                      <td className="py-2 pr-3">
                        <Button size="sm" variant="outline" onClick={() => openPerson(p)} disabled={!p.image_count}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {!people.length ? (
                    <tr>
                      <td colSpan={5} className="py-4 text-darklink dark:text-darklink">
                        No faces captured yet. Click "Detect Face" on a video.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </CardBox>
        </div>
      </div>

      <Dialog
        open={modal.open}
        onOpenChange={(open) => setModal((m) => ({ ...m, open }))}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{modal.person ? `${modal.person.codename} - Images` : 'Images'}</DialogTitle>
          </DialogHeader>

          {modal.loading ? <div className="text-sm text-darklink dark:text-darklink">Loading...</div> : null}
          {modal.error ? <div className="text-sm text-error font-mono">{modal.error}</div> : null}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2 max-h-[70vh] overflow-auto pr-1">
            {modal.images.map((img) => (
              <div key={img.id} className="border border-ld rounded overflow-hidden bg-white dark:bg-dark">
                <img src={apiUrl(img.url)} className="w-full h-40 object-cover bg-lightgray" />
                <div className="p-2 text-xs text-darklink dark:text-darklink">{fmtIso(img.captured_at)}</div>
              </div>
            ))}
            {!modal.loading && !modal.images.length ? (
              <div className="text-sm text-darklink dark:text-darklink">No images.</div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
