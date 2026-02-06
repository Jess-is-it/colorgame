export type HealthResponse = { ok: boolean };

export type CameraStatusResponse = {
  online: boolean;
  source: string;
  error?: string | null;
  last_frame_time?: number | null;
};

const DEFAULT_BASE = 'http://localhost:8000';

export const API_BASE_URL: string = (import.meta as any).env?.VITE_API_BASE_URL || DEFAULT_BASE;

function joinUrl(base: string, path: string): string {
  const b = String(base || '').replace(/\/+$/, '');
  const p = String(path || '').replace(/^\/+/, '');
  return `${b}/${p}`;
}

async function getJson<T>(path: string): Promise<T> {
  const url = joinUrl(API_BASE_URL, path);
  const r = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return (await r.json()) as T;
}

export function streamUrl(cacheBust?: string | number): string {
  const url = joinUrl(API_BASE_URL, 'stream');
  const cb = cacheBust ?? '';
  return cb ? `${url}?cb=${encodeURIComponent(String(cb))}` : url;
}

export function getHealth(): Promise<HealthResponse> {
  return getJson<HealthResponse>('health');
}

export function getCameraStatus(): Promise<CameraStatusResponse> {
  return getJson<CameraStatusResponse>('api/camera/status');
}

