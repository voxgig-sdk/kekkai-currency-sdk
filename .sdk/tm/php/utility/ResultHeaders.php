<?php
declare(strict_types=1);

// KekkaiCurrency SDK utility: result_headers

class KekkaiCurrencyResultHeaders
{
    public static function call(KekkaiCurrencyContext $ctx): ?KekkaiCurrencyResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
