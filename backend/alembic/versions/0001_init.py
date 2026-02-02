"""init

Revision ID: 0001_init
Revises: 
Create Date: 2026-02-02

"""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0001_init"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "presets",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("input_width", sa.Integer(), nullable=False),
        sa.Column("input_height", sa.Integer(), nullable=False),
        sa.Column("rois", sa.JSON(), nullable=False),
        sa.Column("detection_mode", sa.String(length=50), nullable=False, server_default="ocr_keywords"),
        sa.Column("keywords", sa.JSON(), nullable=False),
        sa.Column("confidence_threshold", sa.Float(), nullable=False, server_default="0.7"),
        sa.Column("score_regex", sa.String(length=500), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.UniqueConstraint("name"),
    )

    op.create_table(
        "results",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("preset_id", sa.Integer(), sa.ForeignKey("presets.id", ondelete="CASCADE"), nullable=False),
        sa.Column("raw_text", sa.Text(), nullable=False),
        sa.Column("parsed_result_json", sa.JSON(), nullable=False),
        sa.Column("confidence", sa.Float(), nullable=False),
    )
    op.create_index("ix_results_preset_id", "results", ["preset_id"])


def downgrade() -> None:
    op.drop_index("ix_results_preset_id", table_name="results")
    op.drop_table("results")
    op.drop_table("presets")
