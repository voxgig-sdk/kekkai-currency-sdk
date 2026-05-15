package = "voxgig-sdk-kekkai-currency"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/kekkai-currency-sdk.git"
}
description = {
  summary = "KekkaiCurrency SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["kekkai-currency_sdk"] = "kekkai-currency_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
