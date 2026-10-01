"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "chart",
        "accessor": "Chart",
        "op": "list",
        "method": "GET",
        "path": "/api/getChart",
        "args": [],
        "select": {
            "end_date": "v1",
            "from": "BTC",
            "interval": "daily",
            "start_date": "v1",
            "to": "USD"
        },
        "headers": [],
        "query": [
            "from",
            "to",
            "startDate",
            "endDate",
            "interval"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "from": "BTC",
            "to": "USD",
            "data": [
                {
                    "date": "2024-01-01T00:00:00Z",
                    "rate": 42500.75
                }
            ],
            "interval": "daily"
        },
        "idField": "id"
    },
    {
        "entity": "currency",
        "accessor": "Currency",
        "op": "load",
        "method": "GET",
        "path": "/api/getRate",
        "args": [],
        "select": {
            "date": "2024-01-15",
            "from": "USD",
            "to": "EUR"
        },
        "headers": [],
        "query": [
            "from",
            "to",
            "date"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "from": "USD",
            "to": "EUR",
            "rate": 0.92,
            "date": "2024-01-15T12:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "metadata",
        "accessor": "Metadata",
        "op": "list",
        "method": "GET",
        "path": "/api/metadata",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "version": "1.0.0",
            "supportedCurrencies": {
                "crypto": [
                    "BTC",
                    "ETH",
                    "LTC"
                ],
                "fiat": [
                    "USD",
                    "EUR",
                    "GBP"
                ]
            },
            "dataSources": [
                "CoinGecko",
                "ExchangeRates API"
            ],
            "lastUpdate": "2024-01-15T12:00:00Z",
            "status": "operational"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map