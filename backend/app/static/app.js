async function apiJson(path, opts = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const j = await res.json();
      if (j && j.detail) msg = j.detail;
    } catch (_) {}
    throw new Error(msg);
  }
  return res.json();
}

function $(id) {
  return document.getElementById(id);
}

function setText(id, val) {
  const el = $(id);
  if (el) el.textContent = val;
}

function fmtTime(s) {
  if (!s) return "-";
  return s.replace("T", " ").replace("Z", "Z");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderResults(rows) {
  const body = $("resultsBody");
  if (!body) return;

  if (!rows || rows.length === 0) {
    body.innerHTML = '<tr><td class="muted" colspan="5">No results yet.</td></tr>';
    return;
  }

  body.innerHTML = rows
    .map((r) => {
      return `
<tr>
  <td class="mono">${escapeHtml(fmtTime(r.created_at))}</td>
  <td class="mono">${escapeHtml(r.preset_id)}</td>
  <td class="mono">${escapeHtml(r.confidence.toFixed(2))}</td>
  <td class="mono">${escapeHtml(JSON.stringify(r.parsed_result_json))}</td>
  <td class="mono pre">${escapeHtml(r.raw_text)}</td>
</tr>`;
    })
    .join("");
}

async function refreshStatusAndResults() {
  const status = await apiJson("/api/status");

  setText("stRunning", String(status.running));
  setText("stPreset", status.preset_id ?? "-");
  setText("stConnected", String(status.connected));
  setText("stFrames", String(status.frames_processed));
  setText("stLastFrame", status.last_frame_time ? fmtTime(status.last_frame_time) : "-");
  setText("stLastError", status.last_error ?? "-");

  // RTMP publish status (works even if processing is stopped)
  try {
    const rtmp = await apiJson("/api/rtmp/status");
    const pub = !!rtmp.publishing;
    setText("rtmpPublish", pub ? "publishing" : "not publishing");

    // If OBS is publishing, update preview image occasionally.
    const img = $("previewImg");
    const msg = $("previewMsg");
    if (img) {
      if (pub) {
        // Continuous MJPEG stream (30 FPS server-side).
        if (!img.src || !img.src.includes("/api/preview.mjpeg")) {
          img.src = `/api/preview.mjpeg?t=${Date.now()}`;
        }
        if (msg) msg.textContent = "";
      } else {
        img.removeAttribute("src");
        if (msg) msg.textContent = "Preview appears when RTMP is publishing.";
      }
    }
  } catch (_) {
    setText("rtmpPublish", "unknown");
  }

  const selectedPresetId = $("presetSelect")?.value || "";
  const presetIdForResults = status.running ? status.preset_id : (selectedPresetId ? Number(selectedPresetId) : null);
  if (presetIdForResults) {
    const results = await apiJson(`/api/results?preset_id=${presetIdForResults}&limit=25`);
    renderResults(results);
  }
}

async function startProcessing() {
  const presetId = $("presetSelect")?.value;
  const fps = $("sampleFps")?.value;
  if (!presetId) throw new Error("Select a preset first");

  setText("startStopMsg", "Starting...");
  await apiJson(`/api/processing/start?preset_id=${encodeURIComponent(presetId)}&sample_fps=${encodeURIComponent(fps)}`, {
    method: "POST",
    body: "{}",
  });
  setText("startStopMsg", "Running");
}

async function stopProcessing() {
  setText("startStopMsg", "Stopping...");
  await apiJson(`/api/processing/stop`, { method: "POST", body: "{}" });
  setText("startStopMsg", "Stopped");
}

function hookDashboard() {
  const startBtn = $("startBtn");
  const stopBtn = $("stopBtn");
  if (!startBtn || !stopBtn) return;

  const prevImg = $("previewImg");
  if (prevImg) {
    prevImg.addEventListener("error", () => {
      setText("previewMsg", "Preview error (stream decode not ready yet).");
    });
  }

  startBtn.addEventListener("click", async () => {
    try {
      await startProcessing();
    } catch (e) {
      setText("startStopMsg", e.message || String(e));
    }
  });

  stopBtn.addEventListener("click", async () => {
    try {
      await stopProcessing();
    } catch (e) {
      setText("startStopMsg", e.message || String(e));
    }
  });

  // Poll forever. If API fails, keep trying.
  const tick = async () => {
    try {
      await refreshStatusAndResults();
    } catch (_) {}
    setTimeout(tick, 1000);
  };
  tick();
}

hookDashboard();

async function hookSettings() {
  const testBtn = $("obsTestBtn");
  if (!testBtn) return; // not on settings page

  const applyBtn = $("obsApplyBtn");
  const startBtn = $("obsStartBtn");
  const stopBtn = $("obsStopBtn");
  const msgEl = $("obsMsg");

  function setMsg(s) {
    if (msgEl) msgEl.textContent = s;
  }

  testBtn.addEventListener("click", async () => {
    try {
      setMsg("Testing...");
      const r = await apiJson("/api/obs/test", { method: "POST", body: "{}" });
      setMsg(`OK (OBS ${r.obs_version || "?"}, ws ${r.ws_version || "?"})`);
    } catch (e) {
      setMsg(e.message || String(e));
    }
  });

  if (applyBtn) {
    applyBtn.addEventListener("click", async () => {
      try {
        setMsg("Applying RTMP settings...");
        const server = document.querySelector('input[name="public_rtmp_server_url"]')?.value || $("publicServerUrl")?.value;
        const key = document.querySelector('input[name="public_stream_key"]')?.value || $("publicStreamKey")?.value;
        await apiJson(`/api/obs/apply_rtmp?server_url=${encodeURIComponent(server)}&stream_key=${encodeURIComponent(key)}`, {
          method: "POST",
          body: "{}",
        });
        setMsg("Applied.");
      } catch (e) {
        setMsg(e.message || String(e));
      }
    });
  }

  if (startBtn) {
    startBtn.addEventListener("click", async () => {
      try {
        setMsg("Starting stream...");
        await apiJson("/api/obs/start_stream", { method: "POST", body: "{}" });
        setMsg("Started.");
      } catch (e) {
        setMsg(e.message || String(e));
      }
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener("click", async () => {
      try {
        setMsg("Stopping stream...");
        await apiJson("/api/obs/stop_stream", { method: "POST", body: "{}" });
        setMsg("Stopped.");
      } catch (e) {
        setMsg(e.message || String(e));
      }
    });
  }
}

hookSettings();
