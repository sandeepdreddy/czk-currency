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

  const { isLoading, error, data, isFetching } = useQuery("currencyData", () =>
    axios.get(API_URL)
    .then((res) => {
      console.log('Transformed Data:', transformData(res.data))
      return res.data
    })
  )

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>An error has occurred</p>
  return (
    <div className="App">
      <header className="App-header">
        <p>{data}</p>
        <form>
          <label>
            Amount to Convert:
            <input type="number" />
          </label>
          <label>
            Choose the currency to convert to:
            <select>
              <option value="USD">US Dollar</option>
              <option value="INR">Indian Rupees</option>
              <option value="JPY">Japan Yen</option>
            </select>
          </label>
        </form>
      </header>
    </div>
  );
}

export default App;
