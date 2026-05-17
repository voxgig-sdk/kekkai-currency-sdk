package voxgigkekkaicurrencysdk

import (
	"github.com/voxgig-sdk/kekkai-currency-sdk/go/core"
	"github.com/voxgig-sdk/kekkai-currency-sdk/go/entity"
	"github.com/voxgig-sdk/kekkai-currency-sdk/go/feature"
	_ "github.com/voxgig-sdk/kekkai-currency-sdk/go/utility"
)

// Type aliases preserve external API.
type KekkaiCurrencySDK = core.KekkaiCurrencySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type KekkaiCurrencyEntity = core.KekkaiCurrencyEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type KekkaiCurrencyError = core.KekkaiCurrencyError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewChartEntityFunc = func(client *core.KekkaiCurrencySDK, entopts map[string]any) core.KekkaiCurrencyEntity {
		return entity.NewChartEntity(client, entopts)
	}
	core.NewCurrencyEntityFunc = func(client *core.KekkaiCurrencySDK, entopts map[string]any) core.KekkaiCurrencyEntity {
		return entity.NewCurrencyEntity(client, entopts)
	}
	core.NewMetadataEntityFunc = func(client *core.KekkaiCurrencySDK, entopts map[string]any) core.KekkaiCurrencyEntity {
		return entity.NewMetadataEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewKekkaiCurrencySDK = core.NewKekkaiCurrencySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
