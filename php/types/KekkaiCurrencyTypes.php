<?php
declare(strict_types=1);

// Typed models for the KekkaiCurrency SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Chart entity data model. */
class Chart
{
    public ?string $date = null;
    public ?float $rate = null;
}

/** Match filter for Chart#list (any subset of Chart fields). */
class ChartListMatch
{
    public ?string $date = null;
    public ?float $rate = null;
}

/** Currency entity data model. */
class Currency
{
    public ?string $date = null;
    public ?string $from = null;
    public ?float $rate = null;
    public ?string $to = null;
}

/** Match filter for Currency#load (any subset of Currency fields). */
class CurrencyLoadMatch
{
    public ?string $date = null;
    public ?string $from = null;
    public ?float $rate = null;
    public ?string $to = null;
}

/** Metadata entity data model. */
class Metadata
{
    public ?array $data_source = null;
    public ?string $last_update = null;
    public ?string $status = null;
    public ?array $supported_currency = null;
    public ?string $version = null;
}

/** Match filter for Metadata#list (any subset of Metadata fields). */
class MetadataListMatch
{
    public ?array $data_source = null;
    public ?string $last_update = null;
    public ?string $status = null;
    public ?array $supported_currency = null;
    public ?string $version = null;
}

