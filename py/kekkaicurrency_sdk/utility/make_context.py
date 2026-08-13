# KekkaiCurrency SDK utility: make_context

from kekkaicurrency_sdk.core.context import KekkaiCurrencyContext


def make_context_util(ctxmap, basectx):
    return KekkaiCurrencyContext(ctxmap, basectx)
