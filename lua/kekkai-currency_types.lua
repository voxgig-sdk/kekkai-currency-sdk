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
---@field end_date? string
---@field from string
---@field interval? string
---@field start_date? string
---@field to string

---@class Currency
---@field date? string
---@field from? string
---@field rate? number
---@field to? string

---@class CurrencyLoadMatch
---@field date? string
---@field from string
---@field to string

---@class Metadata
---@field dataSources? table
---@field lastUpdate? string
---@field status? string
---@field supportedCurrencies? table
---@field version? string

---@class MetadataListMatch
---@field dataSources? table
---@field lastUpdate? string
---@field status? string
---@field supportedCurrencies? table
---@field version? string

local M = {}

return M
