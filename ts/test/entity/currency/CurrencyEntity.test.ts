

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"date":{"a":true,"fo":"date-time","h":"Date","n":"date","r":false,"sh":"Date and time of the rate","t":"`$STRING`","key$":"date","index$":0},"from":{"a":true,"h":"From","n":"from","r":false,"sh":"Source currency code","t":"`$STRING`","key$":"from","index$":1},"rate":{"a":true,"fo":"double","h":"Rate","n":"rate","r":false,"sh":"Exchange rate","t":"`$NUMBER`","key$":"rate","index$":2},"to":{"a":true,"h":"To","n":"to","r":false,"sh":"Target currency code","t":"`$STRING`","key$":"to","index$":3}},"name":"currency","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/getRate","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2024-01-15","k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"USD","k":"query","n":"from","or":"from","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"EUR","k":"query","n":"to","or":"to","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/getRate","q":{"exist":["date","from","to"]},"r":{},"s":[{"lit":"api"},{"lit":"getRate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"currency","name__orig":"currency","Name":"Currency","name_":"currency","name-":"currency","NAME":"CURRENCY","index$":1}, {"active":true,"entity":"currency","key$":"BasicCurrencyFlow","kind":"basic","name":"BasicCurrencyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"currency_ref01","srcdatavar":"currency_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-currency_ref01"}}],"index$":0}]}, 'Currency', {"GET /api/getRate":{"protocol":"http","operationId":"getCurrencyRate","responses":{"200":{"description":"Successfully retrieved currency rate","content":{"application/json":{"schema":{"type":"object","properties":{"from":{"description":"Source currency code","example":"USD","key$":"from","type":"string"},"to":{"description":"Target currency code","example":"EUR","key$":"to","type":"string"},"rate":{"description":"Exchange rate","example":0.92,"format":"double","key$":"rate","type":"number"},"date":{"description":"Date and time of the rate","example":"2024-01-15T12:00:00Z","format":"date-time","key$":"date","type":"string"}},"index$":0}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid currency code"},"code":{"type":"integer","description":"Error code","example":400},"details":{"type":"string","description":"Additional error details","example":"The currency code 'XYZ' is not supported"}},"required":["error","code"],"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Currency pair not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid currency code"},"code":{"type":"integer","description":"Error code","example":400},"details":{"type":"string","description":"Additional error details","example":"The currency code 'XYZ' is not supported"}},"required":["error","code"],"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid currency code"},"code":{"type":"integer","description":"Error code","example":400},"details":{"type":"string","description":"Additional error details","example":"The currency code 'XYZ' is not supported"}},"required":["error","code"],"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"from","in":"query","description":"Source currency code (e.g., USD, BTC, EUR)","required":true,"schema":{"type":"string","example":"USD"},"index$":0},{"name":"to","in":"query","description":"Target currency code (e.g., EUR, ETH, JPY)","required":true,"schema":{"type":"string","example":"EUR"},"index$":1},{"name":"date","in":"query","description":"Optional date for historical rate (format: YYYY-MM-DD)","required":false,"schema":{"type":"string","format":"date","example":"2024-01-15"},"index$":2}],"securitySource":"unspecified"}})
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
  
