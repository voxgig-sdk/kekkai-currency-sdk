<?php
declare(strict_types=1);

// KekkaiCurrency SDK exists test

require_once __DIR__ . '/../kekkaicurrency_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = KekkaiCurrencySDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
