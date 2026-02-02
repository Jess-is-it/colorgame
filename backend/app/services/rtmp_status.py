from __future__ import annotations

import time
import urllib.request
import xml.etree.ElementTree as ET


def _fetch_xml(url: str, timeout_s: float = 1.5) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "obs-dashboard/1.0"})
    with urllib.request.urlopen(req, timeout=timeout_s) as resp:
        return resp.read().decode("utf-8", errors="replace")


def get_publish_status(*, stat_url: str, expected_app: str = "live") -> dict:
    """Return whether OBS is publishing to nginx-rtmp.

    In Docker, stat_url is typically http://rtmp/stat.
    """
    started = time.time()
    xml_text = _fetch_xml(stat_url)

    root = ET.fromstring(xml_text)

    streams: list[dict] = []
    publishing = False

    for app in root.findall(".//application"):
        app_name = (app.findtext("name") or "").strip()
        if expected_app and app_name != expected_app:
            continue

        for live in app.findall("live"):
            for stream in live.findall("stream"):
                s_name = (stream.findtext("name") or "").strip()
                clients = int(stream.findtext("nclients") or 0)
                bw_in = int(stream.findtext("bw_in") or 0)
                bw_out = int(stream.findtext("bw_out") or 0)

                if clients > 0:
                    publishing = True

                streams.append({"app": app_name, "name": s_name, "nclients": clients, "bw_in": bw_in, "bw_out": bw_out})

    return {
        "ok": True,
        "publishing": publishing,
        "streams": streams,
        "checked_at_unix": time.time(),
        "latency_ms": int((time.time() - started) * 1000),
    }
