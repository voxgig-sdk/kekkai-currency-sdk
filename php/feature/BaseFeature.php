<?php
declare(strict_types=1);

// KekkaiCurrency SDK base feature

class KekkaiCurrencyBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(KekkaiCurrencyContext $ctx, array $options): void {}
    public function PostConstruct(KekkaiCurrencyContext $ctx): void {}
    public function PostConstructEntity(KekkaiCurrencyContext $ctx): void {}
    public function SetData(KekkaiCurrencyContext $ctx): void {}
    public function GetData(KekkaiCurrencyContext $ctx): void {}
    public function GetMatch(KekkaiCurrencyContext $ctx): void {}
    public function SetMatch(KekkaiCurrencyContext $ctx): void {}
    public function PrePoint(KekkaiCurrencyContext $ctx): void {}
    public function PreSpec(KekkaiCurrencyContext $ctx): void {}
    public function PreRequest(KekkaiCurrencyContext $ctx): void {}
    public function PreResponse(KekkaiCurrencyContext $ctx): void {}
    public function PreResult(KekkaiCurrencyContext $ctx): void {}
    public function PreDone(KekkaiCurrencyContext $ctx): void {}
    public function PreUnexpected(KekkaiCurrencyContext $ctx): void {}
}
