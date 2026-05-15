-- KekkaiCurrency SDK error

local KekkaiCurrencyError = {}
KekkaiCurrencyError.__index = KekkaiCurrencyError


function KekkaiCurrencyError.new(code, msg, ctx)
  local self = setmetatable({}, KekkaiCurrencyError)
  self.is_sdk_error = true
  self.sdk = "KekkaiCurrency"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function KekkaiCurrencyError:error()
  return self.msg
end


function KekkaiCurrencyError:__tostring()
  return self.msg
end


return KekkaiCurrencyError
