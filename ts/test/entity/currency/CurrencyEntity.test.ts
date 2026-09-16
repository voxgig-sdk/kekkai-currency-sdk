

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { KekkaiCurrencySDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('CurrencyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KEKKAI_CURRENCY_TEST_LIVE=TRUE.
  afterEach(liveDelay('KEKKAI_CURRENCY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KekkaiCurrencySDK.test()
    const ent = testsdk.Currency()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KEKKAI_CURRENCY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'currency.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"date","req":false,"short":"Date and time of the rate","type":"`$STRING`","index$":0},{"active":true,"name":"from","req":false,"short":"Source currency code","type":"`$STRING`","index$":1},{"active":true,"format":"double","name":"rate","req":false,"short":"Exchange rate","type":"`$NUMBER`","index$":2},{"active":true,"name":"to","req":false,"short":"Target currency code","type":"`$STRING`","index$":3}],"name":"currency","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"2024-01-15","kind":"query","name":"date","orig":"date","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"USD","kind":"query","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"example":"EUR","kind":"query","name":"to","orig":"to","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /api/getRate","json":"{\"operationId\":\"getCurrencyRate\",\"parameters\":[{\"description\":\"Source currency code (e.g., USD, BTC, EUR)\",\"in\":\"query\",\"name\":\"from\",\"required\":true,\"schema\":{\"example\":\"USD\",\"type\":\"string\"}},{\"description\":\"Target currency code (e.g., EUR, ETH, JPY)\",\"in\":\"query\",\"name\":\"to\",\"required\":true,\"schema\":{\"example\":\"EUR\",\"type\":\"string\"}},{\"description\":\"Optional date for historical rate (format: YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"example\":\"2024-01-15\",\"format\":\"date\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"date\":{\"description\":\"Date and time of the rate\",\"example\":\"2024-01-15T12:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"from\":{\"description\":\"Source currency code\",\"example\":\"USD\",\"type\":\"string\"},\"rate\":{\"description\":\"Exchange rate\",\"example\":0.92,\"format\":\"double\",\"type\":\"number\"},\"to\":{\"description\":\"Target currency code\",\"example\":\"EUR\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved currency rate\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"example\":\"The currency code 'XYZ' is not supported\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"example\":\"The currency code 'XYZ' is not supported\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Currency pair not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"example\":\"The currency code 'XYZ' is not supported\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/getRate","segments":[{"lit":"api"},{"lit":"getRate"}],"select":{"exist":["date","from","to"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"currency","name__orig":"currency","Name":"Currency","name_":"currency","name-":"currency","NAME":"CURRENCY","index$":1}, {"active":true,"entity":"currency","key$":"BasicCurrencyFlow","kind":"basic","name":"BasicCurrencyFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"currency_ref01","srcdatavar":"currency_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-currency_ref01"}}],"index$":0}]}, 'Currency')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let currency_ref01_data = Object.values(setup.data.existing.currency)[0] as any

    // LOAD
    const currency_ref01_ent = client.Currency()
    const currency_ref01_match_dt0: any = {}
    const currency_ref01_data_dt0 = (await currency_ref01_ent.load(currency_ref01_match_dt0)).data()
    assert(null != currency_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/currency/CurrencyTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = KekkaiCurrencySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['currency01','currency02','currency03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KEKKAI_CURRENCY_TEST_CURRENCY_ENTID': idmap,
    'KEKKAI_CURRENCY_TEST_LIVE': 'FALSE',
    'KEKKAI_CURRENCY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['KEKKAI_CURRENCY_TEST_CURRENCY_ENTID']

  const live = 'TRUE' === env.KEKKAI_CURRENCY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KEKKAI_CURRENCY_TEST_CURRENCY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new KekkaiCurrencySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.KEKKAI_CURRENCY_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
