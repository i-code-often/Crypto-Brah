import { useEffect, useState, useContext } from 'react';
import classes from './SearchItem.module.css';
import currencyContext from '../store/currency-context';
import { Link } from 'react-router-dom';

function SearchItem(props) {

  const [coinData, setCoinData] = useState();

  const currencyCtx = useContext(currencyContext);

  useEffect(()=>{
    console.log('effect');
    fetch(`https://api.coingecko.com/api/v3/coins/${props.coin.id}?localization=false`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      setCoinData(data);
    });
  }, []);

  const sign = (profit) => {
    if(profit > 0) return '+'+profit;
    else return profit;
  };

  if(!coinData){
    return (
      ''
    )
  } else {
    return (
      <tr>
        <td style={{overflowX: 'auto'}} className={props.className}>
          <Link to={`/coins/${coinData.id}`} style={{padding: '10px 0'}}>
            <img alt={coinData.symbol} src={coinData.image.small} />
            <h2 style={{margin: '0'}}>{coinData.symbol}</h2>
            <h4 style={{color: 'var(--second-clr)', margin: '0'}}>{coinData.name}</h4>
          </Link>
        </td>
        <td>
          <h2 className={classes.dt}>{currencyCtx.symbol}{coinData.market_data.current_price[currencyCtx.currency]}</h2>
        </td>
        <td>
          <h2 className={classes.dt}>{sign(coinData.market_data.price_change_percentage_24h)}</h2>
        </td>
      </tr>
    )
  }
  
  // return (
    // <Fragment>
    // {
    // coinData ? 
    // <div className={classes.item}>
    //   <div>
    //     <img src={coinData.image.small} />
    //     <h3 style={{margin: '0'}}>{coinData.symbol}</h3>
    //     <h4 style={{margin: '0'}}>{coinData.name}</h4>
    //   </div>
    //   <h4>₹{coinData.market_data.current_price[currencyCtx.currency]}</h4>
    //   <h4>{sign(coinData.market_data.price_change_percentage_24h)}</h4>
    // </div> : ''
    // }
    // </Fragment>

  // );
}

export default SearchItem;