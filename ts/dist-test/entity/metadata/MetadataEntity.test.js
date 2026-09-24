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
(0, node_test_1.describe)('MetadataEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KEKKAI_CURRENCY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KEKKAI_CURRENCY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KekkaiCurrencySDK.test();
        const ent = testsdk.Metadata();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KEKKAI_CURRENCY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'metadata.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "dataSources": { "a": true, "h": "Data Sources", "n": "dataSources", "r": false, "sh": "List of data sources used by the API", "t": "`$ARRAY`", "key$": "dataSources", "index$": 0 }, "lastUpdate": { "a": true, "fo": "date-time", "h": "Last Update", "n": "lastUpdate", "r": false, "sh": "Timestamp of last data update", "t": "`$STRING`", "key$": "lastUpdate", "index$": 1 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "System status", "t": "`$STRING`", "key$": "status", "index$": 2 }, "supportedCurrencies": { "a": true, "h": "Supported Currencies", "n": "supportedCurrencies", "r": false, "t": "`$OBJECT`", "key$": "supportedCurrencies", "index$": 3 }, "version": { "a": true, "h": "Version", "n": "version", "r": false, "sh": "API version", "t": "`$STRING`", "key$": "version", "index$": 4 } }, "name": "metadata", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/metadata", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/metadata", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "metadata" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "metadata", "name__orig": "metadata", "Name": "Metadata", "name_": "metadata", "name-": "metadata", "NAME": "METADATA", "index$": 2 }, { "active": true, "entity": "metadata", "key$": "BasicMetadataFlow", "kind": "basic", "name": "BasicMetadataFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "metadata_ref01" } }], "index$": 0 }] }, 'Metadata', { "GET /api/metadata": { "protocol": "http", "operationId": "getMetadata", "responses": { "200": { "description": "Successfully retrieved metadata", "content": { "application/json": { "schema": { "type": "object", "properties": { "version": { "description": "API version", "example": "1.0.0", "key$": "version", "type": "string" }, "supportedCurrencies": { "key$": "supportedCurrencies", "properties": { "crypto": { "example": ["BTC", "ETH", "LTC", "XRP"], "items": { "type": "string" }, "type": "array" }, "fiat": { "example": ["USD", "EUR", "GBP", "JPY"], "items": { "type": "string" }, "type": "array" } }, "type": "object" }, "dataSources": { "description": "List of data sources used by the API", "example": ["CoinGecko", "ExchangeRates API"], "items": { "type": "string" }, "key$": "dataSources", "type": "array" }, "lastUpdate": { "description": "Timestamp of last data update", "example": "2024-01-15T12:00:00Z", "format": "date-time", "key$": "lastUpdate", "type": "string" }, "status": { "description": "System status", "example": "operational", "key$": "status", "type": "string" } }, "index$": 0 } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message", "example": "Invalid currency code" }, "code": { "type": "integer", "description": "Error code", "example": 400 }, "details": { "type": "string", "description": "Additional error details", "example": "The currency code 'XYZ' is not supported" } }, "required": ["error", "code"], "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let metadata_ref01_data = Object.values(setup.data.existing.metadata)[0];
        // LIST
        const metadata_ref01_ent = client.Metadata();
        const metadata_ref01_match = {};
        const metadata_ref01_list = (await metadata_ref01_ent.list(metadata_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/metadata/MetadataTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KekkaiCurrencySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['metadata01', 'metadata02', 'metadata03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KEKKAI_CURRENCY_TEST_METADATA_ENTID': idmap,
        'KEKKAI_CURRENCY_TEST_LIVE': 'FALSE',
        'KEKKAI_CURRENCY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['KEKKAI_CURRENCY_TEST_METADATA_ENTID'];
    const live = 'TRUE' === env.KEKKAI_CURRENCY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KEKKAI_CURRENCY_TEST_METADATA_ENTID'];
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
//# sourceMappingURL=MetadataEntity.test.js.map