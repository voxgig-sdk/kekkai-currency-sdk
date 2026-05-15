<?php
declare(strict_types=1);

// KekkaiCurrency SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

KekkaiCurrencyUtility::setRegistrar(function (KekkaiCurrencyUtility $u): void {
    $u->clean = [KekkaiCurrencyClean::class, 'call'];
    $u->done = [KekkaiCurrencyDone::class, 'call'];
    $u->make_error = [KekkaiCurrencyMakeError::class, 'call'];
    $u->feature_add = [KekkaiCurrencyFeatureAdd::class, 'call'];
    $u->feature_hook = [KekkaiCurrencyFeatureHook::class, 'call'];
    $u->feature_init = [KekkaiCurrencyFeatureInit::class, 'call'];
    $u->fetcher = [KekkaiCurrencyFetcher::class, 'call'];
    $u->make_fetch_def = [KekkaiCurrencyMakeFetchDef::class, 'call'];
    $u->make_context = [KekkaiCurrencyMakeContext::class, 'call'];
    $u->make_options = [KekkaiCurrencyMakeOptions::class, 'call'];
    $u->make_request = [KekkaiCurrencyMakeRequest::class, 'call'];
    $u->make_response = [KekkaiCurrencyMakeResponse::class, 'call'];
    $u->make_result = [KekkaiCurrencyMakeResult::class, 'call'];
    $u->make_point = [KekkaiCurrencyMakePoint::class, 'call'];
    $u->make_spec = [KekkaiCurrencyMakeSpec::class, 'call'];
    $u->make_url = [KekkaiCurrencyMakeUrl::class, 'call'];
    $u->param = [KekkaiCurrencyParam::class, 'call'];
    $u->prepare_auth = [KekkaiCurrencyPrepareAuth::class, 'call'];
    $u->prepare_body = [KekkaiCurrencyPrepareBody::class, 'call'];
    $u->prepare_headers = [KekkaiCurrencyPrepareHeaders::class, 'call'];
    $u->prepare_method = [KekkaiCurrencyPrepareMethod::class, 'call'];
    $u->prepare_params = [KekkaiCurrencyPrepareParams::class, 'call'];
    $u->prepare_path = [KekkaiCurrencyPreparePath::class, 'call'];
    $u->prepare_query = [KekkaiCurrencyPrepareQuery::class, 'call'];
    $u->result_basic = [KekkaiCurrencyResultBasic::class, 'call'];
    $u->result_body = [KekkaiCurrencyResultBody::class, 'call'];
    $u->result_headers = [KekkaiCurrencyResultHeaders::class, 'call'];
    $u->transform_request = [KekkaiCurrencyTransformRequest::class, 'call'];
    $u->transform_response = [KekkaiCurrencyTransformResponse::class, 'call'];
});
