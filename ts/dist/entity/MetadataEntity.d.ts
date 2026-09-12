import { KekkaiCurrencyEntityBase } from '../KekkaiCurrencyEntityBase';
import type { KekkaiCurrencySDK } from '../KekkaiCurrencySDK';
import type { Control } from '../types';
import type { Metadata, MetadataListMatch } from '../KekkaiCurrencyTypes';
declare class MetadataEntity extends KekkaiCurrencyEntityBase<Metadata> {
    constructor(client: KekkaiCurrencySDK, entopts: any);
    make(this: MetadataEntity): MetadataEntity;
    list(this: any, reqmatch?: MetadataListMatch, ctrl?: Control): Promise<MetadataEntity[]>;
}
export { MetadataEntity };
