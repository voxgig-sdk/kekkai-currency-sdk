-- Typed models for the KekkaiCurrency SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Chart
---@field date? string
---@field rate? number

---@class ChartListMatch

---@class Currency
---@field date? string
---@field from? string
---@field rate? number
---@field to? string

---@class CurrencyLoadMatch

---@class Metadata
---@field data_source? table
---@field last_update? string
---@field status? string
---@field supported_currency? table
---@field version? string

---@class MetadataListMatch

local M = {}

return M
