# KekkaiCurrency SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module KekkaiCurrencyFeatures
  def self.make_feature(name)
    case name
    when "base"
      KekkaiCurrencyBaseFeature.new
    when "ratelimit"
      KekkaiCurrencyRatelimitFeature.new
    when "retry"
      KekkaiCurrencyRetryFeature.new
    when "test"
      KekkaiCurrencyTestFeature.new
    when "timeout"
      KekkaiCurrencyTimeoutFeature.new
    else
      KekkaiCurrencyBaseFeature.new
    end
  end
end
