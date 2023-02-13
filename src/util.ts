import { CurrencyInfo } from './types'

const COLUMN_DELIMITER = '|'

export const HeaderStrings = {
    COUNTRY: 'Country',
    CURRENCY: 'Currency',
    AMOUNT: 'Amount',
    CODE: 'Code',
    RATE: 'Rate',
    UNIT_AMOUNT: 'Unit Amount'
}

// Fetching indexes in case columns are changed in the
// repsonse from the API
const getHeaderIndexes = (headersInfo: string): Record<string, number> => {
    const headers = headersInfo.split(COLUMN_DELIMITER)
    return {
        [HeaderStrings.COUNTRY] : headers.indexOf(HeaderStrings.COUNTRY),
        [HeaderStrings.CURRENCY] : headers.indexOf(HeaderStrings.CURRENCY),
        [HeaderStrings.AMOUNT] : headers.indexOf(HeaderStrings.AMOUNT),
        [HeaderStrings.CODE] : headers.indexOf(HeaderStrings.CODE),
        [HeaderStrings.RATE] : headers.indexOf(HeaderStrings.RATE),
    }
}

export const transformData = (currencyData: string): CurrencyInfo => {
    const [date, headersInfo, ...rest] = currencyData.split('\n')
    const headerIndexes = getHeaderIndexes(headersInfo)
    const conversionData = 
        rest.filter(conversion => !!conversion)
            .map((conversion) => {
                const formattedConversion = conversion.split(COLUMN_DELIMITER)
                const currencyCode = formattedConversion[headerIndexes[HeaderStrings.CODE]]
                return {
                    currencyCode,
                    country: formattedConversion[headerIndexes[HeaderStrings.COUNTRY]],
                    currencyString: formattedConversion[headerIndexes[HeaderStrings.CURRENCY]],
                    amount: Number(formattedConversion[headerIndexes[HeaderStrings.AMOUNT]]),
                    rate: Number(formattedConversion[headerIndexes[HeaderStrings.RATE]]),
                }
            })
    return {
        date,
        conversionData,
    }
}