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
  const [streamError, setStreamError] = useState<boolean>(false);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-dark dark:text-white">
            Color Cube Research Dashboard
          </h1>
          <div className="text-sm text-darklink dark:text-darklink">Live camera preview</div>
        </div>
        <Badge variant={online ? 'success' : 'error'} className="px-3 py-1 text-sm">
          {online ? 'Camera Online' : 'Camera Offline'}
        </Badge>
      </div>

      <CardBox className="p-0 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ld">
          <div className="font-semibold text-dark dark:text-white">Live</div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setStreamError(false);
              setRefreshKey(Date.now());
            }}
            title="Reload the stream"
          >
            Refresh stream
          </Button>
        </div>

        <div className="bg-black">
          <img
            src={imgSrc}
            alt="Live camera stream"
            className="w-full h-auto block"
            onLoad={() => setStreamError(false)}
            onError={() => setStreamError(true)}
          />
        </div>

        {!online || streamError ? (
          <div className="px-5 py-4 text-sm text-darklink dark:text-darklink">
            <span className="font-medium text-dark dark:text-white">Error:</span>{' '}
            <span className="font-mono">
              {streamError ? 'stream failed to load (check VITE_API_BASE_URL)' : (apiError || status?.error || '(none)')}
            </span>
          </div>
        ) : (
          <div className="px-5 py-3 text-xs text-darklink dark:text-darklink">
            Last frame: <span className="font-mono">{fmtTs(status?.last_frame_time) || '(unknown)'}</span>
          </div>
        )}
      </CardBox>
    </div>
  );
};

export default ColorCubeDashboard;
