import styled from 'styled-components'

const CNB_COLOR = '#2526a9'

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const Header = styled.h1`
    color: ${CNB_COLOR};
    margin-bottom: 0.75rem;
    text-align: center;
`

export const InputFieldsContainer = styled.div`
    width: 600px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 0.75rem;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const AmountInputContainer = styled.div``

export const AmountInputField = styled.input`
    border: 2px solid ${CNB_COLOR};
    border-radius: 0.3em;
    padding: 0.25rem;
    min-width: 190px;
`

export const CurrencySelectionContainer = styled.div``

export const CurrencySelectionField = styled.select`
    border: 2px solid ${CNB_COLOR};
    border-radius: 0.3em;
    padding: 0.2rem;
    min-width: 200px;
`

export const FieldLabel = styled.h3`
    margin-bottom: 0.5rem;
`

export const ResultContainer = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SubmitButton = styled.button`
    font-weight: bold;
    font-size: 15px;
    min-width: 200px;
    background: ${CNB_COLOR};
    color: white;
    border-radius: 0.3em;
    border: 2px solid ${CNB_COLOR};
    margin: 0.5em 1em;
    padding: 0.25em 1em;
    cursor: pointer;
`

export const Result = styled.div`
    margin: 10px;
    border: 2px dashed ${CNB_COLOR};
    padding: 10px;
    font-weight: bold;
    min-width: 180px;
`

export const DateInfo = styled.div`
    font-weight: bold;
    font-size: 15px;
`
