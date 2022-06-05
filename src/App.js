import './App.css';
import { Route, Switch } from 'react-router-dom';
// import Home from './pages/Home';
// import CoinDetails from './pages/CoinDetails';
// import NotFound from './pages/NotFound';
import Wrapper from './components/Wrapper';
import { CurrencyContextProvider } from './store/currency-context';
import React, { Suspense } from 'react';

const Home = React.lazy(() => import('./pages/Home'));
const CoinDetails = React.lazy(() => import('./pages/CoinDetails'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Wrapper>
      <CurrencyContextProvider>
        <Suspense fallback={''}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/coins/:coinId">
              <CoinDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </CurrencyContextProvider>
    </Wrapper>
  );
}

export default App;
