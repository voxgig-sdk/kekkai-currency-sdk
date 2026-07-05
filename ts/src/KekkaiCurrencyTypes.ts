// Typed models for the KekkaiCurrency SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Chart {
  date?: string
  rate?: number
}

export interface ChartListMatch {
  date?: string
  rate?: number
}

export interface Currency {
  date?: string
  from?: string
  rate?: number
  to?: string
}

export interface CurrencyLoadMatch {
  date?: string
  from?: string
  rate?: number
  to?: string
}

export interface Metadata {
  data_source?: any[]
  last_update?: string
  status?: string
  supported_currency?: Record<string, any>
  version?: string
}

export interface MetadataListMatch {
  data_source?: any[]
  last_update?: string
  status?: string
  supported_currency?: Record<string, any>
  version?: string
}

