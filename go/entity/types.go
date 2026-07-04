// Typed models for the KekkaiCurrency SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Chart is the typed data model for the chart entity.
type Chart struct {
	Date *string `json:"date,omitempty"`
	Rate *float64 `json:"rate,omitempty"`
}

// ChartListMatch mirrors the chart fields as an all-optional match
// filter (Go analog of Partial<Chart>).
type ChartListMatch struct {
	Date *string `json:"date,omitempty"`
	Rate *float64 `json:"rate,omitempty"`
}

// Currency is the typed data model for the currency entity.
type Currency struct {
	Date *string `json:"date,omitempty"`
	From *string `json:"from,omitempty"`
	Rate *float64 `json:"rate,omitempty"`
	To *string `json:"to,omitempty"`
}

// CurrencyLoadMatch mirrors the currency fields as an all-optional match
// filter (Go analog of Partial<Currency>).
type CurrencyLoadMatch struct {
	Date *string `json:"date,omitempty"`
	From *string `json:"from,omitempty"`
	Rate *float64 `json:"rate,omitempty"`
	To *string `json:"to,omitempty"`
}

// Metadata is the typed data model for the metadata entity.
type Metadata struct {
	DataSource *[]any `json:"data_source,omitempty"`
	LastUpdate *string `json:"last_update,omitempty"`
	Status *string `json:"status,omitempty"`
	SupportedCurrency *map[string]any `json:"supported_currency,omitempty"`
	Version *string `json:"version,omitempty"`
}

// MetadataListMatch mirrors the metadata fields as an all-optional match
// filter (Go analog of Partial<Metadata>).
type MetadataListMatch struct {
	DataSource *[]any `json:"data_source,omitempty"`
	LastUpdate *string `json:"last_update,omitempty"`
	Status *string `json:"status,omitempty"`
	SupportedCurrency *map[string]any `json:"supported_currency,omitempty"`
	Version *string `json:"version,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
