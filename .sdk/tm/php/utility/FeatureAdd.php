<?php
declare(strict_types=1);

// KekkaiCurrency SDK utility: feature_add

class KekkaiCurrencyFeatureAdd
{
    public static function call(KekkaiCurrencyContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
