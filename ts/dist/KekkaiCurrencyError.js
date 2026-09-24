"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KekkaiCurrencyError = void 0;
class KekkaiCurrencyError extends Error {
    isKekkaiCurrencyError = true;
    sdk = 'KekkaiCurrency';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.KekkaiCurrencyError = KekkaiCurrencyError;
//# sourceMappingURL=KekkaiCurrencyError.js.map