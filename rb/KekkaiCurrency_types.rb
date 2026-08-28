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
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] interval
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String]
ChartListMatch = Struct.new(
  :end_date,
  :from,
  :interval,
  :start_date,
  :to,
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
#   @return [String]
#
# @!attribute [rw] to
#   @return [String]
CurrencyLoadMatch = Struct.new(
  :date,
  :from,
  :to,
  keyword_init: true
)

# Metadata entity data model.
#
# @!attribute [rw] dataSources
#   @return [Array, nil]
#
# @!attribute [rw] lastUpdate
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] supportedCurrencies
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
Metadata = Struct.new(
  :dataSources,
  :lastUpdate,
  :status,
  :supportedCurrencies,
  :version,
  keyword_init: true
)

# Request payload for Metadata#list.
#
# @!attribute [rw] dataSources
#   @return [Array, nil]
#
# @!attribute [rw] lastUpdate
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] supportedCurrencies
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
MetadataListMatch = Struct.new(
  :dataSources,
  :lastUpdate,
  :status,
  :supportedCurrencies,
  :version,
  keyword_init: true
)

