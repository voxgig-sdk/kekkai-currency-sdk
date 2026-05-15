# KekkaiCurrency SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

KekkaiCurrencyUtility.registrar = ->(u) {
  u.clean = KekkaiCurrencyUtilities::Clean
  u.done = KekkaiCurrencyUtilities::Done
  u.make_error = KekkaiCurrencyUtilities::MakeError
  u.feature_add = KekkaiCurrencyUtilities::FeatureAdd
  u.feature_hook = KekkaiCurrencyUtilities::FeatureHook
  u.feature_init = KekkaiCurrencyUtilities::FeatureInit
  u.fetcher = KekkaiCurrencyUtilities::Fetcher
  u.make_fetch_def = KekkaiCurrencyUtilities::MakeFetchDef
  u.make_context = KekkaiCurrencyUtilities::MakeContext
  u.make_options = KekkaiCurrencyUtilities::MakeOptions
  u.make_request = KekkaiCurrencyUtilities::MakeRequest
  u.make_response = KekkaiCurrencyUtilities::MakeResponse
  u.make_result = KekkaiCurrencyUtilities::MakeResult
  u.make_point = KekkaiCurrencyUtilities::MakePoint
  u.make_spec = KekkaiCurrencyUtilities::MakeSpec
  u.make_url = KekkaiCurrencyUtilities::MakeUrl
  u.param = KekkaiCurrencyUtilities::Param
  u.prepare_auth = KekkaiCurrencyUtilities::PrepareAuth
  u.prepare_body = KekkaiCurrencyUtilities::PrepareBody
  u.prepare_headers = KekkaiCurrencyUtilities::PrepareHeaders
  u.prepare_method = KekkaiCurrencyUtilities::PrepareMethod
  u.prepare_params = KekkaiCurrencyUtilities::PrepareParams
  u.prepare_path = KekkaiCurrencyUtilities::PreparePath
  u.prepare_query = KekkaiCurrencyUtilities::PrepareQuery
  u.result_basic = KekkaiCurrencyUtilities::ResultBasic
  u.result_body = KekkaiCurrencyUtilities::ResultBody
  u.result_headers = KekkaiCurrencyUtilities::ResultHeaders
  u.transform_request = KekkaiCurrencyUtilities::TransformRequest
  u.transform_response = KekkaiCurrencyUtilities::TransformResponse
}
