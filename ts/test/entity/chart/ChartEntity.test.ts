

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


describe('ChartEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KEKKAI_CURRENCY_TEST_LIVE=TRUE.
  afterEach(liveDelay('KEKKAI_CURRENCY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KekkaiCurrencySDK.test()
    const ent = testsdk.Chart()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KEKKAI_CURRENCY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'chart.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"date","req":false,"type":"`$STRING`","index$":0},{"active":true,"format":"double","name":"rate","req":false,"type":"`$NUMBER`","index$":1}],"name":"chart","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"2024-12-31","kind":"query","name":"end_date","orig":"end_date","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"BTC","kind":"query","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"example":"daily","kind":"query","name":"interval","orig":"interval","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":"2024-01-01","kind":"query","name":"start_date","orig":"start_date","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"example":"USD","kind":"query","name":"to","orig":"to","reqd":true,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /api/getChart","json":"{\"operationId\":\"getChart\",\"parameters\":[{\"description\":\"Source currency code\",\"in\":\"query\",\"name\":\"from\",\"required\":true,\"schema\":{\"example\":\"BTC\",\"type\":\"string\"}},{\"description\":\"Target currency code\",\"in\":\"query\",\"name\":\"to\",\"required\":true,\"schema\":{\"example\":\"USD\",\"type\":\"string\"}},{\"description\":\"Start date for chart data (format: YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"startDate\",\"required\":false,\"schema\":{\"example\":\"2024-01-01\",\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"End date for chart data (format: YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"endDate\",\"required\":false,\"schema\":{\"example\":\"2024-12-31\",\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Time interval for data points (e.g., daily, weekly, monthly)\",\"in\":\"query\",\"name\":\"interval\",\"required\":false,\"schema\":{\"default\":\"daily\",\"enum\":[\"daily\",\"weekly\",\"monthly\"],\"example\":\"daily\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"date\":{\"example\":\"2024-01-01T00:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"rate\":{\"example\":42500.75,\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"from\":{\"example\":\"BTC\",\"type\":\"string\"},\"interval\":{\"example\":\"daily\",\"type\":\"string\"},\"to\":{\"example\":\"USD\",\"type\":\"string\"}},\"type\":\"object\"}},\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successfully generated chart data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"example\":\"The currency code 'XYZ' is not supported\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"example\":\"The currency code 'XYZ' is not supported\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/getChart","segments":[{"lit":"api"},{"lit":"getChart"}],"select":{"exist":["end_date","from","interval","start_date","to"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"chart","name__orig":"chart","Name":"Chart","name_":"chart","name-":"chart","NAME":"CHART","index$":0}, {"active":true,"entity":"chart","key$":"BasicChartFlow","kind":"basic","name":"BasicChartFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"chart_ref01"}}],"index$":0}]}, 'Chart')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let chart_ref01_data = Object.values(setup.data.existing.chart)[0] as any

    // LIST
    const chart_ref01_ent = client.Chart()
    const chart_ref01_match: any = {}

    const chart_ref01_list = (await chart_ref01_ent.list(chart_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/chart/ChartTestData.json')

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
    ['chart01','chart02','chart03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KEKKAI_CURRENCY_TEST_CHART_ENTID': idmap,
    'KEKKAI_CURRENCY_TEST_LIVE': 'FALSE',
    'KEKKAI_CURRENCY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['KEKKAI_CURRENCY_TEST_CHART_ENTID']

  const live = 'TRUE' === env.KEKKAI_CURRENCY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KEKKAI_CURRENCY_TEST_CHART_ENTID']
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
  
