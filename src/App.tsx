import React, {useEffect} from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import {transformData} from './util'

const API_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyForm />
    </QueryClientProvider>
  );
}

function CurrencyForm() {
  
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [selectedAmount, setSelectedAmount] = React.useState(1);

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
      console.log((currencyInfo?.amount / currencyInfo?.rate * selectedAmount).toFixed(3))
    }
  }

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>An error has occurred</p>
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>
            Amount to Convert:
            <input value={selectedAmount} type="number" onChange={handleAmountChange}/>
          </label>
          <label>
            Choose the currency to convert to:
            <select value={selectedCurrency} onChange={handleCurrencySelectionChange}>
              {data?.conversionData.map((currency) => (
                <option key={currency.currencyCode} 
                  value={currency.currencyCode}>{currency.country + ' (' + currency.currencyString + ')'}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
