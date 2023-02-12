import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { Container, Header } from './styles'
import CurrencyConverterForm from './CurrencyConverterForm';
import GlobalStyle from './globalStyles'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Container>
        <Header>Czech Koruna Currency Converter</Header>
        <CurrencyConverterForm />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
