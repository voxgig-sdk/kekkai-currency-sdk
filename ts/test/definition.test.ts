import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "chart",
    "accessor": "Chart",
    "op": "list",
    "method": "GET",
    "path": "/api/getChart",
    "args": [],
    "select": {
      "from": "BTC",
      "to": "USD",
      "end_date": "2024-12-31",
      "interval": "daily",
      "start_date": "2024-01-01"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "image/png"
    ],
    "query": [
      "from",
      "to",
      "startDate",
      "endDate",
      "interval"
    ],
    "queryArgs": [
      {
        "name": "end_date",
        "wire": "endDate"
      },
      {
        "name": "from",
        "wire": "from"
      },
      {
        "name": "interval",
        "wire": "interval"
      },
      {
        "name": "start_date",
        "wire": "startDate"
      },
      {
        "name": "to",
        "wire": "to"
      }
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
      "from": "USD",
      "to": "EUR",
      "date": "2024-01-15"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "from",
      "to",
      "date"
    ],
    "queryArgs": [
      {
        "name": "date",
        "wire": "date"
      },
      {
        "name": "from",
        "wire": "from"
      },
      {
        "name": "to",
        "wire": "to"
      }
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "1.0.0",
      "supportedCurrencies": {
        "fiat": [
          "USD",
          "EUR",
          "GBP"
        ],
        "crypto": [
          "BTC",
          "ETH",
          "LTC"
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
