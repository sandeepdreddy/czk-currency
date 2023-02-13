import { CountryCurrencyInfo } from '../types'
import { HeaderStrings } from '../util'
import { CurrencyRatesTable } from './styles'

export default function CurrencyInfoTable({ conversionInfo} : { conversionInfo: CountryCurrencyInfo[] }) {
    return (
        <CurrencyRatesTable>
            <thead>
                <tr>
                    <th>{HeaderStrings.COUNTRY}</th>
                    <th>{HeaderStrings.CURRENCY}</th>
                    <th>{HeaderStrings.UNIT_AMOUNT}</th>
                    <th>{HeaderStrings.RATE}</th>
                </tr>
            </thead>
            <tbody>
                {conversionInfo.map(conversion => (
                    <tr key={conversion.currencyCode}>
                        <td>{conversion.country}</td>
                        <td>{conversion.currencyString}</td>
                        <td>{conversion.amount + " " + conversion.currencyCode}</td>
                        <td>{conversion.rate + " CZK"}</td>
                    </tr>
                ))}
            </tbody>
        </CurrencyRatesTable>
    )
}