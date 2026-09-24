
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { KekkaiCurrencySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = KekkaiCurrencySDK.test()
    equal(testsdk instanceof KekkaiCurrencySDK, true,
      'KekkaiCurrencySDK.test() must return a client synchronously')
  })

})
