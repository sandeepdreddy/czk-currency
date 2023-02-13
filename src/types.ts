export interface CountryCurrencyInfo {
    currencyCode: string;
    country: string;
    currencyString: string;
    amount: number;
    rate: number;
}

export interface CurrencyInfo {
    date: string;
    conversionData: CountryCurrencyInfo[];
}