import React from "react";

export default function CurrencyRow(props){

    const { currencyOptions , selectCurrency , onChangeCurrency , amount ,onAmountChange  } = props
    
    return(
        <div>
           <input type="number"className="input" value={amount} onChange = {onAmountChange} />
           <select value = {selectCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map( option => (
                <option value={option} key={option}>{option}</option>
            ))}
            
           </select>
        </div>
    )
}

