# frozen_string_literal: true

# Typed models for the KekkaiCurrency SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Chart entity data model.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] rate
#   @return [Float, nil]
Chart = Struct.new(
  :date,
  :rate,
  keyword_init: true
)

# Request payload for Chart#list.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] rate
#   @return [Float, nil]
ChartListMatch = Struct.new(
  :date,
  :rate,
  keyword_init: true
)

# Currency entity data model.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] rate
#   @return [Float, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
Currency = Struct.new(
  :date,
  :from,
  :rate,
  :to,
  keyword_init: true
)

# Request payload for Currency#load.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] rate
#   @return [Float, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
CurrencyLoadMatch = Struct.new(
  :date,
  :from,
  :rate,
  :to,
  keyword_init: true
)

# Metadata entity data model.
#
# @!attribute [rw] data_source
#   @return [Array, nil]
#
# @!attribute [rw] last_update
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] supported_currency
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
Metadata = Struct.new(
  :data_source,
  :last_update,
  :status,
  :supported_currency,
  :version,
  keyword_init: true
)

# Request payload for Metadata#list.
#
# @!attribute [rw] data_source
#   @return [Array, nil]
#
# @!attribute [rw] last_update
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] supported_currency
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
MetadataListMatch = Struct.new(
  :data_source,
  :last_update,
  :status,
  :supported_currency,
  :version,
  keyword_init: true
)

