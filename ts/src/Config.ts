
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'KekkaiCurrency',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "name": "date",
          "type": "`$STRING`"
        },
        {
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
              "parts": [
                "api",
                "getChart"
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
              }
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
          "name": "date",
          "type": "`$STRING`"
        },
        {
          "name": "from",
          "type": "`$STRING`"
        },
        {
          "name": "rate",
          "type": "`$NUMBER`"
        },
        {
          "name": "to",
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
              "parts": [
                "api",
                "getRate"
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
              }
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
          "type": "`$ARRAY`"
        },
        {
          "name": "lastUpdate",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        },
        {
          "name": "supportedCurrencies",
          "type": "`$OBJECT`"
        },
        {
          "name": "version",
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
              "parts": [
                "api",
                "metadata"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

