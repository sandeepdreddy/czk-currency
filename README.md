# CZK Currency Converter

- This is a React web app(bootstrapped using `create-react-app`) which allows users to convert Czech(CZK) currency to other currencies
- [This](https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt?date=09.02.2023) is the API used for the conversion data


## Running the project:

1) From the project root run `npm install`
2) Then run `npm start`
3) Open [http://localhost:3000](http://localhost:3000) to view the *CZK Converter* web app in the browser.

## Screenshots

### Desktop
<img width="864" alt="image" src="https://user-images.githubusercontent.com/36440422/218534068-3b3ca234-b4de-42a3-a0ba-bf9a6bef1a6b.png">

### Mobile
<img width="292" alt="image" src="https://user-images.githubusercontent.com/36440422/218534387-b55904ce-3bba-4e56-983c-23cdb51b3cfe.png">


## Following libraries were used for building the project

1) React
2) Typescript
3) Styled Components
4) React Query
5) **Note: Used a proxy to work around the CORS issue for the local web app**

## Further Considerations

1) Provide two way conversion
2) Stuck to the requirements of the project, but converting as and when there are updates to the inputs instead of waiting for the button click would make it more usable
3) Could extend to have a server running locally which proxies the API
4) Let users pick a date to view historical conversion data

