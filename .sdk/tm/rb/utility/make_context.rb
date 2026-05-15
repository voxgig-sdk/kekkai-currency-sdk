# KekkaiCurrency SDK utility: make_context
require_relative '../core/context'
module KekkaiCurrencyUtilities
  MakeContext = ->(ctxmap, basectx) {
    KekkaiCurrencyContext.new(ctxmap, basectx)
  }
end
