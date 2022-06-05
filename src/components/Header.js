import classes from './Header.module.css';
import Select from 'react-select';
import currencyContext from '../store/currency-context';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

const options = [
  { value: 'INR', label: 'INR' },
  { value: 'USD', label: 'USD' },
  { value: 'JPY', label: 'JPY' },
];


function Header() {

  const currencyCtx = useContext(currencyContext);

  useEffect(()=>{
    console.log(currencyCtx.currency);
  }, [currencyCtx]);

  const currencyChangeHandler = (selectedValue) => {
    currencyCtx.setCurrency(selectedValue.value.toLowerCase());
  };

  return (
    <div className={classes.header}>
      <header className={classes['custom-select']}>
        <h1 className={classes.logo}><Link to="/">CryptoBrah</Link></h1>
        <div className={classes.selectContainer}>
        <Select placeholder={currencyCtx.currency.toUpperCase()} value={currencyCtx.currency} onChange={currencyChangeHandler} options={options}></Select>
        </div>
      </header>
    </div>
  );
}

export default Header;