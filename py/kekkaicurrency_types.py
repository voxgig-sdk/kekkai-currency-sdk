# Typed models for the KekkaiCurrency SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Chart:
    date: Optional[str] = None
    rate: Optional[float] = None


@dataclass
class ChartListMatch:
    date: Optional[str] = None
    rate: Optional[float] = None


@dataclass
class Currency:
    date: Optional[str] = None
    rate: Optional[float] = None
    to: Optional[str] = None


@dataclass
class CurrencyLoadMatch:
    date: Optional[str] = None
    rate: Optional[float] = None
    to: Optional[str] = None


@dataclass
class Metadata:
    data_source: Optional[list] = None
    last_update: Optional[str] = None
    status: Optional[str] = None
    supported_currency: Optional[dict] = None
    version: Optional[str] = None


@dataclass
class MetadataListMatch:
    data_source: Optional[list] = None
    last_update: Optional[str] = None
    status: Optional[str] = None
    supported_currency: Optional[dict] = None
    version: Optional[str] = None

