# ProjectName SDK exists test

import pytest
from kekkaicurrency_sdk import KekkaiCurrencySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = KekkaiCurrencySDK.test(None, None)
        assert testsdk is not None
