package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewChartEntityFunc func(client *KekkaiCurrencySDK, entopts map[string]any) KekkaiCurrencyEntity

var NewCurrencyEntityFunc func(client *KekkaiCurrencySDK, entopts map[string]any) KekkaiCurrencyEntity

var NewMetadataEntityFunc func(client *KekkaiCurrencySDK, entopts map[string]any) KekkaiCurrencyEntity

