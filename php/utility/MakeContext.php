<?php
declare(strict_types=1);

// KekkaiCurrency SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class KekkaiCurrencyMakeContext
{
    public static function call(array $ctxmap, ?KekkaiCurrencyContext $basectx): KekkaiCurrencyContext
    {
        return new KekkaiCurrencyContext($ctxmap, $basectx);
    }
}
