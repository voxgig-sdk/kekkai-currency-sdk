# KekkaiCurrency SDK feature factory

from feature.base_feature import KekkaiCurrencyBaseFeature
from feature.test_feature import KekkaiCurrencyTestFeature


def _make_feature(name):
    features = {
        "base": lambda: KekkaiCurrencyBaseFeature(),
        "test": lambda: KekkaiCurrencyTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
