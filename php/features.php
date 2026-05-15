<?php
declare(strict_types=1);

// KekkaiCurrency SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class KekkaiCurrencyFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new KekkaiCurrencyBaseFeature();
            case "test":
                return new KekkaiCurrencyTestFeature();
            default:
                return new KekkaiCurrencyBaseFeature();
        }
    }
}
