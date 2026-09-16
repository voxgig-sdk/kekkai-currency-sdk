"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ChartEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KEKKAI_CURRENCY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KEKKAI_CURRENCY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KekkaiCurrencySDK.test();
        const ent = testsdk.Chart();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KEKKAI_CURRENCY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'chart.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "date", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "double", "name": "rate", "req": false, "type": "`$NUMBER`", "index$": 1 }], "name": "chart", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "2024-12-31", "kind": "query", "name": "end_date", "orig": "end_date", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "BTC", "kind": "query", "name": "from", "orig": "from", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "daily", "kind": "query", "name": "interval", "orig": "interval", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": "2024-01-01", "kind": "query", "name": "start_date", "orig": "start_date", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "example": "USD", "kind": "query", "name": "to", "orig": "to", "reqd": true, "type": "`$STRING`", "index$": 4 }] }, "contract": { "id": "GET /api/getChart", "json": "{\"operationId\":\"getChart\",\"parameters\":[{\"description\":\"Source currency code\",\"in\":\"query\",\"name\":\"from\",\"required\":true,\"schema\":{\"example\":\"BTC\",\"type\":\"string\"}},{\"description\":\"Target currency code\",\"in\":\"query\",\"name\":\"to\",\"required\":true,\"schema\":{\"example\":\"USD\",\"type\":\"string\"}},{\"description\":\"Start date for chart data (format: YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"startDate\",\"required\":false,\"schema\":{\"example\":\"2024-01-01\",\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"End date for chart data (format: YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"endDate\",\"required\":false,\"schema\":{\"example\":\"2024-12-31\",\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Time interval for data points (e.g., daily, weekly, monthly)\",\"in\":\"query\",\"name\":\"interval\",\"required\":false,\"schema\":{\"default\":\"daily\",\"enum\":[\"daily\",\"weekly\",\"monthly\"],\"example\":\"daily\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"date\":{\"example\":\"2024-01-01T00:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"rate\":{\"example\":42500.75,\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"from\":{\"example\":\"BTC\",\"type\":\"string\"},\"interval\":{\"example\":\"daily\",\"type\":\"string\"},\"to\":{\"example\":\"USD\",\"type\":\"string\"}},\"type\":\"object\"}},\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successfully generated chart data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"example\":\"The currency code 'XYZ' is not supported\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":400,\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"example\":\"The currency code 'XYZ' is not supported\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"error\",\"code\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/getChart", "segments": [{ "lit": "api" }, { "lit": "getChart" }], "select": { "exist": ["end_date", "from", "interval", "start_date", "to"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "chart", "name__orig": "chart", "Name": "Chart", "name_": "chart", "name-": "chart", "NAME": "CHART", "index$": 0 }, { "active": true, "entity": "chart", "key$": "BasicChartFlow", "kind": "basic", "name": "BasicChartFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "chart_ref01" } }], "index$": 0 }] }, 'Chart');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let chart_ref01_data = Object.values(setup.data.existing.chart)[0];
        // LIST
        const chart_ref01_ent = client.Chart();
        const chart_ref01_match = {};
        const chart_ref01_list = (await chart_ref01_ent.list(chart_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/chart/ChartTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KekkaiCurrencySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['chart01', 'chart02', 'chart03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KEKKAI_CURRENCY_TEST_CHART_ENTID': idmap,
        'KEKKAI_CURRENCY_TEST_LIVE': 'FALSE',
        'KEKKAI_CURRENCY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['KEKKAI_CURRENCY_TEST_CHART_ENTID'];
    const live = 'TRUE' === env.KEKKAI_CURRENCY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KEKKAI_CURRENCY_TEST_CHART_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.KekkaiCurrencySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=ChartEntity.test.js.map