import styled from "styled-components";

export const CurrencyRatesTable = styled.table`
  margin-top: 1rem;
  border: none;
  border-collapse: collapse;
  td, th {
    border: none;
  }
  td {
    padding: 5px 10px;
  }
  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
`