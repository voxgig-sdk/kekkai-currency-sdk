<?php
declare(strict_types=1);

// KekkaiCurrency SDK utility: prepare_body

class KekkaiCurrencyPrepareBody
{
    public static function call(KekkaiCurrencyContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
