export type HealthResponse = { ok: boolean };

export type Settings = {
  capture_new_person: boolean;
  existing_capture_interval_minutes: number;
  max_images_per_person: number;
  sample_fps: number;
};

export type VideoRow = {
  id: number;
  original_name: string;
  stored_name: string;
  uploaded_at: string;
  duration_sec?: number | null;
  width?: number | null;
  height?: number | null;
  fps?: number | null;
};

export type PersonRow = {
  id: number;
  codename: string;
  last_seen?: string | null;
  image_count: number;
  thumbnail_url: string; // relative path from backend
};

export type Detection = {
  video_id: number;
  t_sec: number;
  x: number;
  y: number;
  w: number;
  h: number;
  person_id?: number | null;
  score?: number | null;
};

export type JobStatus = {
  job_id: string;
  video_id: number;
  state: 'queued' | 'running' | 'done' | 'error';
  progress: number;
  message: string;
  started_at?: string | null;
  finished_at?: string | null;
};

function defaultBaseUrl(): string {
  // If opened from another machine, "localhost" is the client machine.
  // Default to the same host serving the frontend, but with backend port 8000.
  try {
    const host =
      typeof window !== 'undefined' && window.location && window.location.hostname
        ? window.location.hostname
        : 'localhost';
    return `http://${host}:8000`;
  } catch (_) {
    return 'http://localhost:8000';
  }
}

export const API_BASE_URL: string = (import.meta as any).env?.VITE_API_BASE_URL || defaultBaseUrl();

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

async function sendJson<T>(path: string, method: 'PUT' | 'POST', body: any): Promise<T> {
  const url = joinUrl(API_BASE_URL, path);
  const r = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body ?? {}),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return (await r.json()) as T;
}

export function apiUrl(path: string): string {
  return joinUrl(API_BASE_URL, path);
}

export function getHealth(): Promise<HealthResponse> {
  return getJson<HealthResponse>('health');
}

export function getSettings(): Promise<Settings> {
  return getJson<Settings>('api/settings');
}

export function updateSettings(s: Partial<Settings>): Promise<Settings> {
  return sendJson<Settings>('api/settings', 'PUT', s);
}

export async function listVideos(): Promise<VideoRow[]> {
  const r = await getJson<{ videos: VideoRow[] }>('api/videos');
  return r.videos || [];
}

export async function uploadVideo(file: File): Promise<VideoRow> {
  const url = joinUrl(API_BASE_URL, 'api/videos');
  const fd = new FormData();
  fd.append('file', file);
  const r = await fetch(url, { method: 'POST', body: fd });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const json = (await r.json()) as { video: VideoRow };
  return json.video;
}

export async function replaceVideo(videoId: number, file: File): Promise<void> {
  const url = joinUrl(API_BASE_URL, `api/videos/${videoId}`);
  const fd = new FormData();
  fd.append('file', file);
  const r = await fetch(url, { method: 'PUT', body: fd });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
}

export async function deleteVideo(videoId: number): Promise<void> {
  const url = joinUrl(API_BASE_URL, `api/videos/${videoId}`);
  const r = await fetch(url, { method: 'DELETE' });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
}

export function videoFileUrl(videoId: number): string {
  return joinUrl(API_BASE_URL, `api/videos/${videoId}/file`);
}

export async function startDetection(videoId: number): Promise<string> {
  const url = joinUrl(API_BASE_URL, `api/videos/${videoId}/detect`);
  const r = await fetch(url, { method: 'POST', headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const json = (await r.json()) as { job_id: string };
  return json.job_id;
}

export function getJob(jobId: string): Promise<JobStatus> {
  return getJson<JobStatus>(`api/jobs/${jobId}`);
}

export async function getDetections(videoId: number): Promise<Detection[]> {
  const r = await getJson<{ detections: Detection[] }>(`api/videos/${videoId}/detections`);
  return r.detections || [];
}

export async function listPersons(): Promise<PersonRow[]> {
  const r = await getJson<{ persons: PersonRow[] }>('api/persons');
  return r.persons || [];
}

export async function listPersonImages(personId: number): Promise<{ id: number; captured_at: string; url: string }[]> {
  const r = await getJson<{ images: { id: number; captured_at: string; url: string }[] }>(
    `api/persons/${personId}/images`,
  );
  return r.images || [];
}

