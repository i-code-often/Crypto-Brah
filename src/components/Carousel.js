import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Carousel.css';
import { Link } from 'react-router-dom';
import Loader from './UI/Loader';

function Carousel(props){

  const responsive = {
    0: {
      items: 2,
    },
    500: {
      items: 4,
    },
  };

  return (
    <div className={`trending-coins`}>
      {props.trendingCoins.length > 0 ? (
      <AliceCarousel
        mouseTracking
        infinite
        responsive={responsive}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        autoPlay={true}
        autoPlayInterval={1000}
        autoPlayStrategy="action"
        items={props.trendingCoins.map((coin) => {
          return (
            <Link to={`/coins/${coin.item.id}`}>
              <div className={'trending-coin-item'}>
                <img alt={coin.item.symbol} width="40px" src={coin.item.large} />
                <p>{coin.item.name}</p>
              </div>
            </Link>
          );
        })} />
    ) : <Loader />}
  </div>
  );
}

export default Carousel;