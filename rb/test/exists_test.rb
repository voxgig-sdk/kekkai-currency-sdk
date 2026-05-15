# KekkaiCurrency SDK exists test

require "minitest/autorun"
require_relative "../KekkaiCurrency_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = KekkaiCurrencySDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
