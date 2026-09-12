export interface Chart {
    date?: string;
    rate?: number;
}
export interface ChartListMatch {
    end_date?: string;
    from: string;
    interval?: string;
    start_date?: string;
    to: string;
}
export interface Currency {
    date?: string;
    from?: string;
    rate?: number;
    to?: string;
}
export interface CurrencyLoadMatch {
    date?: string;
    from: string;
    to: string;
}
export interface Metadata {
    dataSources?: any[];
    lastUpdate?: string;
    status?: string;
    supportedCurrencies?: Record<string, any>;
    version?: string;
}
export interface MetadataListMatch {
    dataSources?: any[];
    lastUpdate?: string;
    status?: string;
    supportedCurrencies?: Record<string, any>;
    version?: string;
}
