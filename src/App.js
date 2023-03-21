
import './App.css';
import CurrencyRow from './CurrencyRow';
import React , { useEffect , useState } from 'react';

const BASE_URL = "https://api.apilayer.com/exchangerates_data/latest";
// var myheaders = new Headers();
// myheaders.append("eTZBphycM0pUoPrzPVOjP0HByjwDTMs3");

//   var requestOptions = {
//     method : 'GET',
//     headers : myheaders
//   }

function App() {

  const [currencyOptions , setCurrencyOptions] = useState([])  
  const [fromCurrency , setFromCurrency] = useState()
  const [toCurrency , setToCurrency] = useState()
  const [exchangeRate , setExchangeRate] = useState()
  const [amount , setAmount] = useState()
  const [ amountInFromCurrency, setAmountInFromCurrency] = useState(true)


  let toAmount , fromAmount;
  if (amountInFromCurrency){
    fromAmount = amount
    toAmount = amount * exchangeRate
  }
  else
  {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  // console.log(currencyOptions)
  useEffect( () => {
      fetch(BASE_URL , { headers: {
        'apikey': 'eTZBphycM0pUoPrzPVOjP0HByjwDTMs3'
      } })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setCurrencyOptions([ ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        let firstCurrency = Object.keys(data.rates)[0]
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
        console.log(data.rates[firstCurrency])

      })

  },[] )

  useEffect( () => {
    if ( fromCurrency != null && toCurrency != null){
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}` , { headers: {
        'apikey': 'eTZBphycM0pUoPrzPVOjP0HByjwDTMs3'
      } })
      .then(res => res.json())
      .then(data => {
        console.log(data.rates[toCurrency])
        setExchangeRate(data.rates[toCurrency])
      })
  }
  } , [fromCurrency , toCurrency])


  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
    <h1> Convert </h1>
    <CurrencyRow 
        currencyOptions = {currencyOptions}
        selectCurrency = {fromCurrency }
        onChangeCurrency = {e => setFromCurrency(e.target.value)}
        amount = {fromAmount}
        onAmountChange = {handleFromAmountChange}
    />
    <div className='equals'> = </div>
    <CurrencyRow
      currencyOptions = {currencyOptions}
      selectCurrency = {toCurrency }
      onChangeCurrency = {e => setToCurrency(e.target.value)}
      amount = {toAmount}
      onAmountChange = {handleToAmountChange}
    />
    </>
  );
}

export default App;
