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
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('chart hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.KekkaiCurrencySDK.test(offline).Chart().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.KekkaiCurrencySDK.test(offline).Chart()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.KekkaiCurrencySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Chart().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.KekkaiCurrencySDK.test().Chart().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.KekkaiCurrencySDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Chart().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Chart().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.KekkaiCurrencySDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Chart().list({ "end_date": 1, "from": "x", "to": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KEKKAI_CURRENCY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'chart.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "date": { "a": true, "fo": "date-time", "h": "Date", "n": "date", "r": false, "t": "`$STRING`", "key$": "date", "index$": 0 }, "rate": { "a": true, "fo": "double", "h": "Rate", "n": "rate", "r": false, "t": "`$NUMBER`", "key$": "rate", "index$": 1 } }, "name": "chart", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/getChart", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2024-12-31", "k": "query", "n": "end_date", "or": "endDate", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "BTC", "k": "query", "n": "from", "or": "from", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "daily", "k": "query", "n": "interval", "or": "interval", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "2024-01-01", "k": "query", "n": "start_date", "or": "startDate", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "USD", "k": "query", "n": "to", "or": "to", "r": true, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/api/getChart", "q": { "exist": ["from", "to"] }, "r": {}, "rs": { "alternatives": [{ "binary": true, "kind": "raw", "media": "image/png" }], "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "getChart" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "chart", "name__orig": "chart", "Name": "Chart", "name_": "chart", "name-": "chart", "NAME": "CHART", "index$": 0 }, { "active": true, "entity": "chart", "key$": "BasicChartFlow", "kind": "basic", "name": "BasicChartFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "chart_ref01" } }], "index$": 0 }] }, 'Chart', { "GET /api/getChart": { "protocol": "http", "parameters": [{ "name": "from", "in": "query", "description": "Source currency code", "required": true, "schema": { "type": "string", "example": "BTC" }, "index$": 0 }, { "name": "to", "in": "query", "description": "Target currency code", "required": true, "schema": { "type": "string", "example": "USD" }, "index$": 1 }, { "name": "startDate", "in": "query", "description": "Start date for chart data (format: YYYY-MM-DD)", "required": false, "schema": { "type": "string", "format": "date", "example": "2024-01-01" }, "index$": 2 }, { "name": "endDate", "in": "query", "description": "End date for chart data (format: YYYY-MM-DD)", "required": false, "schema": { "type": "string", "format": "date", "example": "2024-12-31" }, "index$": 3 }, { "name": "interval", "in": "query", "description": "Time interval for data points (e.g., daily, weekly, monthly)", "required": false, "schema": { "type": "string", "enum": ["daily", "weekly", "monthly"], "default": "daily", "example": "daily" }, "index$": 4 }] } }, { strict: LIVE_STRICT, t });
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
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
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