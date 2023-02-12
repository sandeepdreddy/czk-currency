import styled from "styled-components"

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 120px;
`

export const Header = styled.h1`
    color: #2526a9;
    margin-bottom: 0.75rem;
`

export const InputFieldsContainer = styled.div`
    width: 600px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 0.75rem;
`

export const AmountInputContainer = styled.div``

export const AmountInputField = styled.input`
    border: 2px solid #2526a9;
    border-radius: 0.3em;
    padding: 0.25rem;
`

export const CurrencySelectionContainer = styled.div``

export const CurrencySelectionField = styled.select`
    border: 2px solid #2526a9;
    border-radius: 0.3em;
    padding: 0.2rem;
`

export const FieldLabel = styled.h3`
    margin-bottom: 0.5rem;
`

export const ResultContainer = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

export const SubmitButton = styled.button`
    font-weight: bold;
    font-size: 15px;
    min-width: 200px;
    background: #2526a9;
    color: white;
    border-radius: 0.3em;
    border: 2px solid #2526a9;
    margin: 0.5em 1em;
    padding: 0.25em 1em;
    cursor: pointer;
`
