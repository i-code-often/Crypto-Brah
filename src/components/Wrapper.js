import React from "react";
import Header from "./Header";
import './Wrapper.css';

function Wrapper(props) {
  return (
    <div className="all">
      <div className="all-content">
        {props.children}
      </div>
      <div className="footer">
        <span className="footer-content">♡ GoodBye My Friend ♡</span>
      </div>
    </div>
  );
}

export default Wrapper;