# KekkaiCurrency SDK utility: feature_add
module KekkaiCurrencyUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
