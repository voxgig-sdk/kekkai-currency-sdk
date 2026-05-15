<?php
declare(strict_types=1);

// KekkaiCurrency SDK utility: result_body

class KekkaiCurrencyResultBody
{
    public static function call(KekkaiCurrencyContext $ctx): ?KekkaiCurrencyResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
