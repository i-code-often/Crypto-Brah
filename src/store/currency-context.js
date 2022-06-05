import React, { useState } from 'react';

const currencyContext = React.createContext({
  symbol: '',
  currency: '',
  setCurrency: ()=>{},
});

export default currencyContext;

const CurrencyContextProvider = function(props){

  const [currency, setCurrency] = useState('inr');
  const [symbol, setSymbol] = useState('₹');

  return (
    <currencyContext.Provider value={{
      currency: currency,
      symbol: symbol,
      setCurrency: (cur='inr')=>{
        if(cur==='inr') setSymbol('₹');
        else if(cur==='usd') setSymbol('$');
        else if(cur==='jpy') setSymbol('¥');

        setCurrency(cur);
      },
    }}>
      {props.children}
    </currencyContext.Provider>
  );
}

export { CurrencyContextProvider };


