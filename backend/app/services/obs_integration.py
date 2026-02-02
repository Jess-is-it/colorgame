from __future__ import annotations

import socket
from dataclasses import dataclass


@dataclass(frozen=True)
class ObsConfig:
    host: str
    port: int
    password: str | None


class ObsIntegrationError(Exception):
    pass


def _tcp_check(host: str, port: int, timeout_s: float = 2.0) -> None:
    try:
        with socket.create_connection((host, port), timeout=timeout_s):
            return
    except Exception as e:
        raise ObsIntegrationError(f"Cannot connect to OBS websocket at {host}:{port}: {e}")


def test_connection(cfg: ObsConfig) -> dict:
    _tcp_check(cfg.host, cfg.port)

    try:
        from obsws_python import ReqClient
    except Exception as e:
        raise ObsIntegrationError(f"obsws-python not available: {e}")

    # obsws-python connects on init; close immediately.
    try:
        client = ReqClient(host=cfg.host, port=cfg.port, password=cfg.password or "")
        try:
            ver = client.get_version()
            return {
                "ok": True,
                "obs_version": getattr(ver, "obs_version", None) or getattr(ver, "obsVersion", None),
                "rpc_version": getattr(ver, "rpc_version", None) or getattr(ver, "rpcVersion", None),
                "ws_version": getattr(ver, "obs_web_socket_version", None) or getattr(ver, "obsWebSocketVersion", None),
            }
        finally:
            try:
                client.disconnect()
            except Exception:
                pass
    except Exception as e:
        raise ObsIntegrationError(str(e))


def apply_rtmp_settings(cfg: ObsConfig, *, server_url: str, stream_key: str) -> dict:
    """Configure OBS to stream to a custom RTMP destination.

    Requires obs-websocket v5.
    """
    try:
        from obsws_python import ReqClient
    except Exception as e:
        raise ObsIntegrationError(f"obsws-python not available: {e}")

    try:
        client = ReqClient(host=cfg.host, port=cfg.port, password=cfg.password or "")
        try:
            # Per obs-websocket v5: SetStreamServiceSettings
            # obsws-python currently exposes this as (ss_type, ss_settings)
            client.set_stream_service_settings("rtmp_custom", {"server": server_url, "key": stream_key})
            return {"ok": True}
        finally:
            try:
                client.disconnect()
            except Exception:
                pass
    except Exception as e:
        raise ObsIntegrationError(str(e))


def start_stream(cfg: ObsConfig) -> dict:
    try:
        from obsws_python import ReqClient
    except Exception as e:
        raise ObsIntegrationError(f"obsws-python not available: {e}")

    try:
        client = ReqClient(host=cfg.host, port=cfg.port, password=cfg.password or "")
        try:
            client.start_stream()
            return {"ok": True}
        finally:
            try:
                client.disconnect()
            except Exception:
                pass
    except Exception as e:
        raise ObsIntegrationError(str(e))


def stop_stream(cfg: ObsConfig) -> dict:
    try:
        from obsws_python import ReqClient
    except Exception as e:
        raise ObsIntegrationError(f"obsws-python not available: {e}")

    try:
        client = ReqClient(host=cfg.host, port=cfg.port, password=cfg.password or "")
        try:
            client.stop_stream()
            return {"ok": True}
        finally:
            try:
                client.disconnect()
            except Exception:
                pass
    except Exception as e:
        raise ObsIntegrationError(str(e))
