import React from 'react';
import './operator.css';

const Operator = (props) => (
  <button
    className="operatorSumMenu"
    onClick={props.clickFunction}
  >
    {props.calculator}
  </button>
);

export default Operator;