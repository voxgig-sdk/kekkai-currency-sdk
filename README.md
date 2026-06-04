# KekkaiCurrency SDK

Collect historical exchange rates for fiat and cryptocurrencies from open sources, with chart-ready output

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Kekkai Currency API

[Kekkai](https://kekkai.redume.su) is an open-source service that collects and stores historical currency data from public sources, covering both fiat currencies and cryptocurrencies. The public instance at `https://api.kekkai.redume.su` exposes a small HTTP API for querying that history.

What you get from the API:

- Exchange rates for a single date or a date range (`/api/getRate`)
- Chart-ready data series for a custom range or the past week (`/api/getChart`, `/api/getChart/week`)
- Metadata about supported currencies and data sources (`/api/metadata`)

The API is unauthenticated on the public instance and CORS is enabled on the working endpoints. Because Kekkai is self-hostable, the set of available currencies and the upstream data sources depend on the operator of each instance.

## Try it

**TypeScript**
```bash
npm install kekkai-currency
```

**Python**
```bash
pip install kekkai-currency-sdk
```

**PHP**
```bash
composer require voxgig/kekkai-currency-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/kekkai-currency-sdk/go
```

**Ruby**
```bash
gem install kekkai-currency-sdk
```

**Lua**
```bash
luarocks install kekkai-currency-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { KekkaiCurrencySDK } from 'kekkai-currency'

const client = new KekkaiCurrencySDK({})

// List all charts
const charts = await client.Chart().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o kekkai-currency-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "kekkai-currency": {
      "command": "/abs/path/to/kekkai-currency-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Chart** | Time-series exchange-rate data shaped for plotting, returned by `/api/getChart` for a custom date range and `/api/getChart/week` for the trailing week. | `/api/getChart` |
| **Currency** | Historical exchange-rate lookups for a single day or a date range via `/api/getRate`, covering both fiat and cryptocurrency pairs. | `/api/getRate` |
| **Metadata** | Descriptive information about the instance's supported currencies and underlying data sources, exposed via `/api/metadata`. | `/api/metadata` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from kekkaicurrency_sdk import KekkaiCurrencySDK

client = KekkaiCurrencySDK({})

# List all charts
charts, err = client.Chart(None).list(None, None)
```

### PHP

```php
<?php
require_once 'kekkaicurrency_sdk.php';

$client = new KekkaiCurrencySDK([]);

// List all charts
[$charts, $err] = $client->Chart(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/kekkai-currency-sdk/go"

client := sdk.NewKekkaiCurrencySDK(map[string]any{})

// List all charts
charts, err := client.Chart(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "KekkaiCurrency_sdk"

client = KekkaiCurrencySDK.new({})

# List all charts
charts, err = client.Chart(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("kekkai-currency_sdk")

local client = sdk.new({})

-- List all charts
local charts, err = client:Chart(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = KekkaiCurrencySDK.test()
const result = await client.Chart().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = KekkaiCurrencySDK.test(None, None)
result, err = client.Chart(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = KekkaiCurrencySDK::test(null, null);
[$result, $err] = $client->Chart(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Chart(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = KekkaiCurrencySDK.test(nil, nil)
result, err = client.Chart(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Chart(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Kekkai Currency API

- Upstream: [https://kekkai.redume.su](https://kekkai.redume.su)
- API docs: [https://kekkai.redume.su/docs](https://kekkai.redume.su/docs)

- Kekkai is described as free and open-source software.
- The source code is published at [github.com/redume/kekkai](https://github.com/redume/kekkai); consult the repository for the exact licence text.
- Public servers are run by independent operators who set their own data-collection and privacy policies.

---

Generated from the Kekkai Currency API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
