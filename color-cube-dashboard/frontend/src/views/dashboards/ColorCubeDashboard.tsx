import { useEffect, useMemo, useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { getCameraStatus, streamUrl, type CameraStatusResponse } from 'src/lib/cameraApi';

function fmtTs(ts?: number | null): string {
  if (!ts) return '';
  try {
    const d = new Date(ts * 1000);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleString();
  } catch (_) {
    return '';
  }
}

const ColorCubeDashboard = () => {
  const [status, setStatus] = useState<CameraStatusResponse | null>(null);
  const [apiError, setApiError] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState<number>(() => Date.now());

  const online = !!status?.online && !apiError;

  const imgSrc = useMemo(() => streamUrl(refreshKey), [refreshKey]);

  useEffect(() => {
    let cancelled = false;

    async function tick() {
      try {
        const s = await getCameraStatus();
        if (cancelled) return;
        setStatus(s);
        setApiError('');
      } catch (e: any) {
        if (cancelled) return;
        setApiError(String(e?.message || e || 'API error'));
      }
    }

    tick();
    const t = window.setInterval(tick, 2000);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-dark dark:text-white">
              Color Cube Research Dashboard
            </h1>
            <div className="text-sm text-darklink dark:text-darklink">
              Live camera preview (MJPEG)
            </div>
          </div>
          <Badge variant={online ? 'success' : 'error'} className="px-3 py-1 text-sm">
            {online ? 'Online' : 'Offline'}
          </Badge>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8">
        <CardBox className="p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-ld">
            <div className="font-semibold text-dark dark:text-white">Camera</div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRefreshKey(Date.now())}
                title="Reloads the <img> source with a cache-busting query string"
              >
                Refresh stream
              </Button>
            </div>
          </div>

          <div className="bg-black">
            <img
              src={imgSrc}
              alt="Live camera stream"
              className="w-full h-auto block"
              onError={() => {
                // The stream can drop; keep the status badge driven by /api/camera/status.
                // But refresh the img URL so the browser attempts a new connection.
                setRefreshKey(Date.now());
              }}
            />
          </div>

          <div className="px-5 py-4 text-sm text-darklink dark:text-darklink">
            <div className="flex flex-col gap-1">
              <div>
                <span className="font-medium text-dark dark:text-white">Source:</span>{' '}
                <span className="font-mono">{status?.source || '(unknown)'}</span>
              </div>
              <div>
                <span className="font-medium text-dark dark:text-white">Last frame:</span>{' '}
                <span className="font-mono">{fmtTs(status?.last_frame_time) || '(none)'}</span>
              </div>
              {!online ? (
                <div>
                  <span className="font-medium text-dark dark:text-white">Error:</span>{' '}
                  <span className="font-mono">{apiError || status?.error || '(none)'}</span>
                </div>
              ) : null}
            </div>
          </div>
        </CardBox>
      </div>

      <div className="col-span-12 lg:col-span-4">
        <CardBox className="p-0">
          <div className="px-5 py-4 border-b border-ld font-semibold text-dark dark:text-white">
            Camera Status
          </div>
          <div className="px-5 py-4 text-sm">
            <div className="flex items-center justify-between py-2">
              <div className="text-darklink dark:text-darklink">State</div>
              <Badge variant={online ? 'success' : 'error'}>{online ? 'Online' : 'Offline'}</Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-ld">
              <div className="text-darklink dark:text-darklink">Endpoint</div>
              <div className="font-mono">/stream</div>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-ld">
              <div className="text-darklink dark:text-darklink">Status API</div>
              <div className="font-mono">/api/camera/status</div>
            </div>
          </div>
        </CardBox>
      </div>
    </div>
  );
};

export default ColorCubeDashboard;

