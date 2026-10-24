

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { KekkaiCurrencySDK, BaseFeature, config, stdutil } from '../../..'

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


describe('MetadataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KEKKAI_CURRENCY_TEST_LIVE=TRUE.
  afterEach(liveDelay('KEKKAI_CURRENCY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KekkaiCurrencySDK.test()
    const ent = testsdk.Metadata()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('metadata hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of KekkaiCurrencySDK.test(offline).Metadata().stream('list')) { }
    }, /offline/)

    for await (const _item of KekkaiCurrencySDK.test(offline).Metadata()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = KekkaiCurrencySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Metadata().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of KekkaiCurrencySDK.test().Metadata().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new KekkaiCurrencySDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Metadata().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Metadata().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KekkaiCurrencySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Metadata().list({"lastUpdate":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KEKKAI_CURRENCY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'metadata.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dataSources":{"a":true,"h":"Data Sources","n":"dataSources","r":false,"sh":"List of data sources used by the API","t":"`$ARRAY`","key$":"dataSources","index$":0},"lastUpdate":{"a":true,"fo":"date-time","h":"Last Update","n":"lastUpdate","r":false,"sh":"Timestamp of last data update","t":"`$STRING`","key$":"lastUpdate","index$":1},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"System status","t":"`$STRING`","key$":"status","index$":2},"supportedCurrencies":{"a":true,"h":"Supported Currencies","n":"supportedCurrencies","r":false,"t":"`$OBJECT`","key$":"supportedCurrencies","index$":3},"version":{"a":true,"h":"Version","n":"version","r":false,"sh":"API version","t":"`$STRING`","key$":"version","index$":4}},"name":"metadata","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/metadata","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/metadata","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"metadata"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"metadata","name__orig":"metadata","Name":"Metadata","name_":"metadata","name-":"metadata","NAME":"METADATA","index$":2}, {"active":true,"entity":"metadata","key$":"BasicMetadataFlow","kind":"basic","name":"BasicMetadataFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"metadata_ref01"}}],"index$":0}]}, 'Metadata', {"GET /api/metadata":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let metadata_ref01_data = Object.values(setup.data.existing.metadata)[0] as any

    // LIST
    const metadata_ref01_ent = client.Metadata()
    const metadata_ref01_match: any = {}

    const metadata_ref01_list = (await metadata_ref01_ent.list(metadata_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/metadata/MetadataTestData.json')

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
    ['metadata01','metadata02','metadata03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KEKKAI_CURRENCY_TEST_METADATA_ENTID': idmap,
    'KEKKAI_CURRENCY_TEST_LIVE': 'FALSE',
    'KEKKAI_CURRENCY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['KEKKAI_CURRENCY_TEST_METADATA_ENTID']

  const live = 'TRUE' === env.KEKKAI_CURRENCY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KEKKAI_CURRENCY_TEST_METADATA_ENTID']
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
  
