import { KekkaiCurrencyEntityBase } from '../KekkaiCurrencyEntityBase';
import type { KekkaiCurrencySDK } from '../KekkaiCurrencySDK';
import type { Control } from '../types';
import type { Currency, CurrencyLoadMatch } from '../KekkaiCurrencyTypes';
declare class CurrencyEntity extends KekkaiCurrencyEntityBase<Currency> {
    constructor(client: KekkaiCurrencySDK, entopts: any);
    make(this: CurrencyEntity): CurrencyEntity;
    load(this: any, reqmatch?: CurrencyLoadMatch, ctrl?: Control): Promise<CurrencyEntity>;
}
export { CurrencyEntity };
