import classes from './Main.module.css';
import { useEffect, useState } from 'react';
import Carousel from './Carousel';
import CoinsList from './CoinsList';
import bgImg from '../images/fabio-oyXis2kALVg-unsplash.jpg';

function Main() {
  const [trendingCoins, setTrendingCoins] = useState([]);

  useEffect(() => {
    setTimeout(()=>{
      fetch('https://api.coingecko.com/api/v3/search/trending')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTrendingCoins(data.coins);
      });
    }, 3000);
  }, []);

  return (
     <div style={{}} className={classes.main}>
      <div className="container">
      <h1 className={classes.text}
        style={{
          color: 'var(--main-clr)',
          textWrap: 'break-word',
          wordWrap: 'break-word',
          textAlign: 'center',
        }}
      >
        All Cryptos at one place !
      </h1>
      <Carousel trendingCoins={trendingCoins} className="container"/>  
      <CoinsList />
      </div>
    </div>
  );
}

export default Main;