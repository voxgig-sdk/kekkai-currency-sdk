# KekkaiCurrency SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module KekkaiCurrencyFeatures
  def self.make_feature(name)
    case name
    when "base"
      KekkaiCurrencyBaseFeature.new
    when "test"
      KekkaiCurrencyTestFeature.new
    else
      KekkaiCurrencyBaseFeature.new
    end
  end
end
