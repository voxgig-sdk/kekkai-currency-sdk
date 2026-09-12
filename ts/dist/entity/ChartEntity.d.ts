import { KekkaiCurrencyEntityBase } from '../KekkaiCurrencyEntityBase';
import type { KekkaiCurrencySDK } from '../KekkaiCurrencySDK';
import type { Control } from '../types';
import type { Chart, ChartListMatch } from '../KekkaiCurrencyTypes';
declare class ChartEntity extends KekkaiCurrencyEntityBase<Chart> {
    constructor(client: KekkaiCurrencySDK, entopts: any);
    make(this: ChartEntity): ChartEntity;
    list(this: any, reqmatch?: ChartListMatch, ctrl?: Control): Promise<ChartEntity[]>;
}
export { ChartEntity };
