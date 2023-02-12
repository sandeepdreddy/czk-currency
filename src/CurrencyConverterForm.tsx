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
    SubmitButton
} from './styles'

const API_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'

export default function CurrencyConverterForm() {
    const [selectedCurrency, setSelectedCurrency] = React.useState('');
    const [selectedAmount, setSelectedAmount] = React.useState(1);
    const [convertedAmount, setConvertedAmount] = React.useState('');

    const handleCurrencySelectionChange = (event: React.SyntheticEvent) => {
        let target = event.target as HTMLInputElement;
        setSelectedCurrency(target.value);
    }

    const handleAmountChange = (event: React.SyntheticEvent) => {
        let target = event.target as HTMLInputElement;
        setSelectedAmount(Number(target.value));
    }

    const { isLoading, error, data, isFetching } = useQuery("currencyData", () =>
        axios.get(API_URL)
        .then((res) => {
        console.log('Transformed Data:', transformData(res.data))
        return transformData(res.data)
        })
    )

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const currencyInfo = data?.conversionData.find(({currencyCode}) => currencyCode === selectedCurrency)
        if (currencyInfo) {
            const convertedAmount = (currencyInfo?.amount / currencyInfo?.rate * selectedAmount).toFixed(3)
            setConvertedAmount(convertedAmount)
            console.log(convertedAmount)
        }
    }

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>An error has occurred</p>
    return (
        <>
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
                    <p>{selectedAmount + " CZK = " + convertedAmount + " " + selectedCurrency}</p>
                </ResultContainer>
                {/* <button type="submit">Submit</button> */}
            </form>
        </>
    )
}