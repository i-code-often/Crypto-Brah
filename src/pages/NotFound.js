import img from '../images/5203299.jpg';
import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-container">
      <div>
        <figure>
          <img src={img} alt="404 Not Found"/>
          <figcaption><a href="http://www.freepik.com">Designed by stories / Freepik</a>
  </figcaption>
        </figure>
        <Link to="/"><h1>Go Back Home</h1></Link>
      </div>
    </div>
  );
}

export default NotFound;