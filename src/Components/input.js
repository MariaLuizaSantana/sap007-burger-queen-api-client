import React from 'react';
import './input.css';

const Input = ({ min, className, type, placeholder, name, icon }) => (
  <div className="inputLoginContainer">
    <div className="inputLoginIcon">
      {icon}
    </div>

    <input
      className={className}
      type={type}
      placeholder={placeholder}
      name={name}
      min={min}
    />
  </div>
);

Input.defaultProps = {
  className: 'inputLogin'
};

export default Input;