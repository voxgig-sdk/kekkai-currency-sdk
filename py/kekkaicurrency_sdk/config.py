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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "format": "date-time",
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "format": "double",
            "name": "rate",
            "type": "`$NUMBER`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": "BTC",
                      "kind": "query",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "daily",
                      "kind": "query",
                      "name": "interval",
                      "orig": "interval",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "2024-01-01",
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "USD",
                      "kind": "query",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "end_date",
                    "from",
                    "interval",
                    "start_date",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "api",
                  "getChart",
                ],
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
            "format": "date-time",
            "name": "date",
            "short": "Date and time of the rate",
            "type": "`$STRING`",
          },
          {
            "name": "from",
            "short": "Source currency code",
            "type": "`$STRING`",
          },
          {
            "format": "double",
            "name": "rate",
            "short": "Exchange rate",
            "type": "`$NUMBER`",
          },
          {
            "name": "to",
            "short": "Target currency code",
            "type": "`$STRING`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": "USD",
                      "kind": "query",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "EUR",
                      "kind": "query",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "date",
                    "from",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "getRate",
                ],
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
            "short": "List of data sources used by the API",
            "type": "`$ARRAY`",
          },
          {
            "format": "date-time",
            "name": "lastUpdate",
            "short": "Timestamp of last data update",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "short": "System status",
            "type": "`$STRING`",
          },
          {
            "name": "supportedCurrencies",
            "type": "`$OBJECT`",
          },
          {
            "name": "version",
            "short": "API version",
            "type": "`$STRING`",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "metadata",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "metadata",
                ],
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
