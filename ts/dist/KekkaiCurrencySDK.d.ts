import { ChartEntity } from './entity/ChartEntity';
import { CurrencyEntity } from './entity/CurrencyEntity';
import { MetadataEntity } from './entity/MetadataEntity';
export type * from './KekkaiCurrencyTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { KekkaiCurrencyEntityBase } from './KekkaiCurrencyEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class KekkaiCurrencySDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Chart(entopts?: Record<string, any>): ChartEntity;
    Currency(entopts?: Record<string, any>): CurrencyEntity;
    Metadata(entopts?: Record<string, any>): MetadataEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): KekkaiCurrencySDK;
    tester(testopts?: any, sdkopts?: any): KekkaiCurrencySDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof KekkaiCurrencySDK;
export { stdutil, config, BaseFeature, KekkaiCurrencyEntityBase, KekkaiCurrencySDK, SDK, };
