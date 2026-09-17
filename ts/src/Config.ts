
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'KekkaiCurrency',
        slug: "kekkai-currency",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.kekkai.redume.su",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        chart: {
        },
  
        currency: {
        },
  
        metadata: {
        },
  
    }
  }


  entity = {
    "chart": {
      "fields": [
        {
          "format": "date-time",
          "name": "date",
          "type": "`$STRING`"
        },
        {
          "format": "double",
          "name": "rate",
          "type": "`$NUMBER`"
        }
      ],
      "name": "chart",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "2024-12-31",
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "BTC",
                    "kind": "query",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "daily",
                    "kind": "query",
                    "name": "interval",
                    "orig": "interval",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "2024-01-01",
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "USD",
                    "kind": "query",
                    "name": "to",
                    "orig": "to",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/getChart",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "getChart"
                }
              ],
              "select": {
                "exist": [
                  "end_date",
                  "from",
                  "interval",
                  "start_date",
                  "to"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "api",
                "getChart"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "currency": {
      "fields": [
        {
          "format": "date-time",
          "name": "date",
          "short": "Date and time of the rate",
          "type": "`$STRING`"
        },
        {
          "name": "from",
          "short": "Source currency code",
          "type": "`$STRING`"
        },
        {
          "format": "double",
          "name": "rate",
          "short": "Exchange rate",
          "type": "`$NUMBER`"
        },
        {
          "name": "to",
          "short": "Target currency code",
          "type": "`$STRING`"
        }
      ],
      "name": "currency",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "2024-01-15",
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "USD",
                    "kind": "query",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "EUR",
                    "kind": "query",
                    "name": "to",
                    "orig": "to",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/getRate",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "getRate"
                }
              ],
              "select": {
                "exist": [
                  "date",
                  "from",
                  "to"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "getRate"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "metadata": {
      "fields": [
        {
          "name": "dataSources",
          "short": "List of data sources used by the API",
          "type": "`$ARRAY`"
        },
        {
          "format": "date-time",
          "name": "lastUpdate",
          "short": "Timestamp of last data update",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "short": "System status",
          "type": "`$STRING`"
        },
        {
          "name": "supportedCurrencies",
          "type": "`$OBJECT`"
        },
        {
          "name": "version",
          "short": "API version",
          "type": "`$STRING`"
        }
      ],
      "name": "metadata",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/metadata",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "metadata"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "metadata"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

