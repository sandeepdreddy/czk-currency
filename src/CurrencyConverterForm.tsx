import React from 'react';
import { useQuery } from "react-query";
import axios from "axios";
import {transformData} from './util'
import {
    InputFieldsContainer, 
    AmountInputContainer, 
    CurrencySelectionContainer, 
    AmountInputField, 
    CurrencySelectionField,
    FieldLabel,
    ResultContainer,
    SubmitButton,
    Result,
    DateInfo
} from './styles'
import CurrencyInfoTable from './components/currencytInfoTable'

const API_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'

export default function CurrencyConverterForm() {
    const [selectedCurrency, setSelectedCurrency] = React.useState('');
    const [selectedAmount, setSelectedAmount] = React.useState(1);
    const [convertedAmount, setConvertedAmount] = React.useState('');

    const handleCurrencySelectionChange = (event: React.SyntheticEvent) => {
        let target = event.target as HTMLInputElement;
        setSelectedCurrency(target.value);
        setConvertedAmount('')
    }

    const handleAmountChange = (event: React.SyntheticEvent) => {
        let target = event.target as HTMLInputElement;
        setSelectedAmount(Number(target.value));
        setConvertedAmount('')
    }

    const { isLoading, error, data } = useQuery("currencyData", () =>
        axios.get(API_URL)
            .then((res) => {
                const transformedData = transformData(res.data)
                const { conversionData } = transformedData
                if (conversionData && conversionData.length) {
                    // Set first currency as the deafult selection
                    setSelectedCurrency(conversionData[0].currencyCode)
                }
                return transformedData
            })
    )

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const currencyInfo = data?.conversionData.find(({currencyCode}) => currencyCode === selectedCurrency)
        if (currencyInfo) {
            const convertedAmount = (currencyInfo?.amount / currencyInfo?.rate * selectedAmount).toFixed(3)
            setConvertedAmount(convertedAmount)
        }
    }

    if (isLoading) return <p>Loading currency info...</p>

    if (error) return <p>Error occurred while fetching currency inforamtion</p>

    return (
        <>
            {/* <h3>Date: {data?.date.substring(0, data?.date.lastIndexOf(' '))}</h3> */}
            <form onSubmit={handleSubmit}>
                <InputFieldsContainer>
                    <AmountInputContainer>
                        <FieldLabel>Amount in CZK:</FieldLabel>
                        <AmountInputField value={selectedAmount} type="number" onChange={handleAmountChange} />
                    </AmountInputContainer>
                    <CurrencySelectionContainer>
                        <FieldLabel>To:</FieldLabel>
                        <CurrencySelectionField value={selectedCurrency} onChange={handleCurrencySelectionChange}>
                            {data?.conversionData.map((currency) => (
                                <option key={currency.currencyCode} 
                                    value={currency.currencyCode}>{currency.country + ' (' + currency.currencyString + ')'}
                                </option>
                            ))}
                        </CurrencySelectionField>
                    </CurrencySelectionContainer>
                </InputFieldsContainer>
                <ResultContainer>
                    <SubmitButton type="submit">Convert</SubmitButton>
                    <Result>{selectedAmount + " CZK = " + convertedAmount + " " + selectedCurrency}</Result>
                    <DateInfo>Showing exchange rates for the date: {data?.date.substring(0, data?.date.lastIndexOf(' '))}</DateInfo>
                </ResultContainer>
            </form>
            {data && <CurrencyInfoTable conversionInfo={data.conversionData}/>}
        </>
    )
}