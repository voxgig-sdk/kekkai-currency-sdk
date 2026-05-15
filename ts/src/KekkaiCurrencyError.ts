
import { Context } from './Context'


class KekkaiCurrencyError extends Error {

  isKekkaiCurrencyError = true

  sdk = 'KekkaiCurrency'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  KekkaiCurrencyError
}

