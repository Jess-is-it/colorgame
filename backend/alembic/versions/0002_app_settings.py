"""app settings

Revision ID: 0002_app_settings
Revises: 0001_init
Create Date: 2026-02-02

"""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0002_app_settings"
down_revision = "0001_init"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "app_settings",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("backend_stream_url", sa.String(length=500), nullable=False, server_default="rtmp://rtmp:1935/live/stream"),
        sa.Column("public_rtmp_server_url", sa.String(length=500), nullable=True),
        sa.Column("public_stream_key", sa.String(length=200), nullable=False, server_default="stream"),
        sa.Column("obs_ws_enabled", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("obs_ws_host", sa.String(length=200), nullable=False, server_default="127.0.0.1"),
        sa.Column("obs_ws_port", sa.Integer(), nullable=False, server_default="4455"),
        sa.Column("obs_ws_password", sa.String(length=200), nullable=True),
        sa.Column("obs_auto_configure_stream", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("obs_auto_start_stream", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("obs_auto_stop_stream", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
    )

    # Seed row id=1
    op.execute("INSERT INTO app_settings (id) VALUES (1)")


def downgrade() -> None:
    op.drop_table("app_settings")
