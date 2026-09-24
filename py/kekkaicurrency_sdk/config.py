# KekkaiCurrency SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "KekkaiCurrency",
            "slug": "kekkai-currency",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.kekkai.redume.su",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "chart": {},
                "currency": {},
                "metadata": {},
            },
        },
        "entity": {
      "chart": {
        "fields": [
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "rate",
            "title": "Rate",
            "type": "`$NUMBER`",
            "format": "double",
          },
        ],
        "name": "chart",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/getChart",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "getChart",
                  },
                ],
                "parts": [
                  "api",
                  "getChart",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2024-12-31",
                    },
                    {
                      "name": "from",
                      "orig": "from",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "BTC",
                    },
                    {
                      "name": "interval",
                      "orig": "interval",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "daily",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2024-01-01",
                    },
                    {
                      "name": "to",
                      "orig": "to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "USD",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "end_date",
                    "from",
                    "interval",
                    "start_date",
                    "to",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "currency": {
        "fields": [
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "short": "Date and time of the rate",
            "format": "date-time",
          },
          {
            "name": "from",
            "title": "From",
            "type": "`$STRING`",
            "short": "Source currency code",
          },
          {
            "name": "rate",
            "title": "Rate",
            "type": "`$NUMBER`",
            "short": "Exchange rate",
            "format": "double",
          },
          {
            "name": "to",
            "title": "To",
            "type": "`$STRING`",
            "short": "Target currency code",
          },
        ],
        "name": "currency",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/getRate",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "getRate",
                  },
                ],
                "parts": [
                  "api",
                  "getRate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2024-01-15",
                    },
                    {
                      "name": "from",
                      "orig": "from",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "USD",
                    },
                    {
                      "name": "to",
                      "orig": "to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "EUR",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "date",
                    "from",
                    "to",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "metadata": {
        "fields": [
          {
            "name": "dataSources",
            "title": "Data Sources",
            "type": "`$ARRAY`",
            "short": "List of data sources used by the API",
          },
          {
            "name": "lastUpdate",
            "title": "Last Update",
            "type": "`$STRING`",
            "short": "Timestamp of last data update",
            "format": "date-time",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "short": "System status",
          },
          {
            "name": "supportedCurrencies",
            "title": "Supported Currencies",
            "type": "`$OBJECT`",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
            "short": "API version",
          },
        ],
        "name": "metadata",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/metadata",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "metadata",
                  },
                ],
                "parts": [
                  "api",
                  "metadata",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
