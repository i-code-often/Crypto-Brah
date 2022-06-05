import classes from './CoinDetails.module.css';
import NotFound from './NotFound';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Loader2 from '../components/UI/Loader2';
import currencyContext from '../store/currency-context';
import parse from 'html-react-parser';
import Typewriter from 'typewriter-effect';

import { Line } from 'react-chartjs-2';
import Header from '../components/Header';

function CoinDetails() {
  const currencyCtx = useContext(currencyContext);

  const params = useParams();
  const [loadingFirstTime, setLoadingFirstTime] = useState(true);
  const [error, setError] = useState('');
  const [historicData, setHistoricData] = useState();
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(1);

  const { coinId } = params;
  const { currency } = currencyCtx;

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    )
      .then((res) => {
        console.log('coin data', res.status);

        if (res.status === 404) throw new Error('Not Found');

        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError('Something Went wrong');
          setLoadingFirstTime(false);
          return;
        }
        console.log(data);
        setCoinData(data);
        setLoadingFirstTime(false);
      })
      .catch((err) => {
        if (err.message === 'Not Found') {
          console.log('😎', err.message);
          setError(err.message);
          setLoadingFirstTime(false);
        } 
        else setError('Something Went Wrong');
      });
  }, [coinId]);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
    )
      .then((res) => {
        console.log(res.status);
        if (res.status === 404){
          console.log('hello not found');
          throw new Error('Not Found');
        }

        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError('Something Went Wrong');
          setLoadingFirstTime(false);
          return;
        }
        console.log(data.prices);
        setHistoricData(data.prices);
        setLoadingFirstTime(false);
      })
      .catch((err) => {
        if (err.message === 'Not Found') setError('Not Found');
        else setError('Something Went Wrong');

        setLoadingFirstTime(false);
      });
  }, [coinId, currency, days]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
  };

  const daysBtnClickHandler = (days) => {
    setDays(days);
  };

  console.log(error);

  return (
    <React.Fragment>
      {coinData && error === '' && !loadingFirstTime ? (
        <React.Fragment>
          <Header />
          <div className={classes['coin-details-container']}>
            <div className={classes['coin-info']}>
              <div>
                <Typewriter
                  options={{
                    loop: true,
                    delay: 250,
                    cursorClassName: classes['typewriter-cursor'],
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(
                        `<h1 style="color: var(--main-clr); letter-spacing: 2px; margin: 0; display: inline; ">${coinData.name}</h1>`
                      )
                      .pauseFor(5000)
                      .start();
                  }}
                />
              </div>

              <h2>Symbol: {coinData.symbol}</h2>
              <img src={coinData.image.small} />
              <p>
                {coinData.description.en
                  ? parse(
                      coinData.description.en.split('. ')[0] +
                        '. ' +
                        (coinData.description.en.split('. ')[1]
                          ? coinData.description.en.split('. ')[1]
                          : '')
                    )
                  : 'Not Enough Info Available...'}
              </p>
              <h2>
                Current Price: {currencyCtx.symbol}
                {coinData.market_data.current_price[currencyCtx.currency]}
              </h2>
              <h2>
                Market Cap: {currencyCtx.symbol}
                {coinData.market_data.market_cap[currencyCtx.currency]}
              </h2>
              <a
                className={classes['more-info']}
                target="_blank"
                href={coinData.links.homepage[0]}
              >
                More Info
              </a>
            </div>
            {historicData && !error ? (
              <div className={classes['coin-chart']}>
                <div
                  style={{
                    minHeight: '450px',
                    maxHeight: '500px',
                    minWidth: '600px',
                    flex: '1',
                  }}
                >
                  <Line
                    options={options}
                    data={{
                      labels: historicData.map((coin) => {
                        let date = new Date(coin[0]);

                        if (days === 1) return date.toLocaleTimeString();
                        return date.toLocaleDateString();
                      }),

                      datasets: [
                        {
                          data: historicData.map((coin) => coin[1]),
                          label: `Price ( Past ${days} Days ) in ${currencyCtx.currency}`,
                          borderColor: '#A7D129',
                        },
                      ],
                    }}
                  />
                </div>
                <div className={classes['days-btns']}>
                  <button onClick={daysBtnClickHandler.bind(null, 1)}>
                    24 Hours
                  </button>
                  <button onClick={daysBtnClickHandler.bind(null, 30)}>
                    30 Days
                  </button>
                  <button onClick={daysBtnClickHandler.bind(null, 120)}>
                    4 Months
                  </button>
                  <button onClick={daysBtnClickHandler.bind(null, 365)}>
                    1 Year
                  </button>
                </div>
              </div>
            ) : error === '' ? (
              <Loader2 />
            ) : (
              <h2>{error}</h2>
            )}
          </div>
        </React.Fragment>
      ) : loadingFirstTime ? (
        <div style={{ marginTop: '40px' }}>
          <Loader2 />
        </div>
      ) : error === 'Not Found' ? (
        <NotFound />
      ) : (
        <h2>{error}</h2>
      )}
    </React.Fragment>
  );
}

export default CoinDetails;
