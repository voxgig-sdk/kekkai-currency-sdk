<?php
declare(strict_types=1);

// KekkaiCurrency SDK configuration

class KekkaiCurrencyConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "KekkaiCurrency",
                "slug" => "kekkai-currency",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.kekkai.redume.su",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "chart" => [],
                    "currency" => [],
                    "metadata" => [],
                ],
            ],
            "entity" => [
        'chart' => [
          'fields' => [
            [
              'name' => 'date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rate',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'chart',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2024-12-31',
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'BTC',
                        'kind' => 'query',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'daily',
                        'kind' => 'query',
                        'name' => 'interval',
                        'orig' => 'interval',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '2024-01-01',
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'USD',
                        'kind' => 'query',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/getChart',
                  'parts' => [
                    'api',
                    'getChart',
                  ],
                  'select' => [
                    'exist' => [
                      'end_date',
                      'from',
                      'interval',
                      'start_date',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'currency' => [
          'fields' => [
            [
              'name' => 'date',
              'short' => 'Date and time of the rate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'from',
              'short' => 'Source currency code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rate',
              'short' => 'Exchange rate',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'to',
              'short' => 'Target currency code',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'currency',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2024-01-15',
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'USD',
                        'kind' => 'query',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'EUR',
                        'kind' => 'query',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/getRate',
                  'parts' => [
                    'api',
                    'getRate',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                      'from',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'metadata' => [
          'fields' => [
            [
              'name' => 'dataSources',
              'short' => 'List of data sources used by the API',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'lastUpdate',
              'short' => 'Timestamp of last data update',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'short' => 'System status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'supportedCurrencies',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'version',
              'short' => 'API version',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'metadata',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/metadata',
                  'parts' => [
                    'api',
                    'metadata',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return KekkaiCurrencyFeatures::make_feature($name);
    }
}
