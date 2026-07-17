-- KekkaiCurrency SDK exists test

local sdk = require("kekkai-currency_sdk")

describe("KekkaiCurrencySDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
