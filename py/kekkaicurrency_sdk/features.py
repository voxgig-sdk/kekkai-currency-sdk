# KekkaiCurrency SDK feature factory

from kekkaicurrency_sdk.feature.base_feature import KekkaiCurrencyBaseFeature
from kekkaicurrency_sdk.feature.ratelimit_feature import KekkaiCurrencyRatelimitFeature
from kekkaicurrency_sdk.feature.retry_feature import KekkaiCurrencyRetryFeature
from kekkaicurrency_sdk.feature.test_feature import KekkaiCurrencyTestFeature
from kekkaicurrency_sdk.feature.timeout_feature import KekkaiCurrencyTimeoutFeature


_FEATURES = {
    "base": lambda: KekkaiCurrencyBaseFeature(),
    "ratelimit": lambda: KekkaiCurrencyRatelimitFeature(),
    "retry": lambda: KekkaiCurrencyRetryFeature(),
    "test": lambda: KekkaiCurrencyTestFeature(),
    "timeout": lambda: KekkaiCurrencyTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
