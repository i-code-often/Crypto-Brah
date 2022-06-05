import { useEffect, useState, useContext } from 'react'
import Input from './UI/Input';
import Loader from './UI/Loader';
import Loader2 from './UI/Loader2';
import SearchItem from './SearchItem';
import classes from './CoinsList.module.css';
import currencyContext from '../store/currency-context';

function CoinsList() {
  const currencyCtx = useContext(currencyContext);

  const [enteredTextInput, setEnteredTextInput] = useState('');
  const [firstTime, setFirstTime] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const inputChangeHandler = (event) => {
    console.log(enteredTextInput);
    setEnteredTextInput(event.currentTarget.value);
  };

  useEffect(()=>{
    const query = enteredTextInput.trim();
    if(!query){
      setIsLoading(true);
      fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyCtx.currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`)
      .then(res=>{
        if(!res.ok) throw new Error();
        return res.json();
      })
      .then(data=>{
        setIsLoading(false);
        setSearchResults(data);
      })
      .catch(()=>{
        setError(true);
      });
    }
  }, [currencyCtx.currency]);
  
  useEffect(()=>{
    const query = enteredTextInput.trim();
    if(!query) return;
    
    let timeout = setTimeout(()=>{
      setFirstTime(false);
      setIsLoading(true);
      fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
      .then(res=>{
        if(!res.ok) throw new Error();
        return res.json();
      })
      .then(data=>{
        if(data.coins.length>10) setSearchResults(data.coins.slice(0,10));
        else setSearchResults(data.coins);

        setIsLoading(false);

        console.log(data.coins);
      })
      .catch(()=>{
        setError(true);
      })
    }, 1000);
    
    return ()=>{
      setIsLoading(false);
      clearTimeout(timeout);
    };

  }, [enteredTextInput]);

  if(error){
    return <div>
      <Input className={classes.input} style={{margin: '0 auto', marginTop: '20px', marginBottom: '20px'}} onChange={inputChangeHandler} value={enteredTextInput} type="text" placeholder="Search For Any Coin" />
      <h2>Something went wrong</h2>
    </div>
  }

  return (
    <div>
      <Input className={classes.input} style={{margin: '0 auto', marginTop: '20px', marginBottom: '20px'}} onChange={inputChangeHandler} value={enteredTextInput} type="text" placeholder="Search For Any Coin" />
      {isLoading && <Loader2 />}
      {firstTime && <h1 style={{textAlign: 'center', width: 'max-content', maxWidth: '100%', margin: '20px auto'}}>Top 10 Coins by market cap</h1>}
      {!isLoading && searchResults.length > 0 &&
      <div className={classes['table-container']}>
        <table>
          <tbody>
          <tr style={{padding: '100px 0'}}>
            <th className={classes['sticky-col']+' '+classes['first-col']}><h2>Info</h2></th>
            <th><h2>Price</h2></th>
            <th><h2>Change 24hrs</h2></th>
          </tr>
          {searchResults.map(coin=>{
            return <SearchItem className={classes['sticky-col']+' '+classes['first-col']} coin={coin}/>
          })}
          </tbody>
        </table>
      </div>
      }
      {!isLoading && searchResults.length === 0 && 
      <h2 style={{textAlign: 'center'}}>No Results found</h2>}
    </div>
  );
}

export default CoinsList;