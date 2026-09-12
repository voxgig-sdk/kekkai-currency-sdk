import { Context } from './Context';
declare class KekkaiCurrencyError extends Error {
    isKekkaiCurrencyError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { KekkaiCurrencyError };
