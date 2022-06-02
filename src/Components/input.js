import React from 'react';
import './input.css';

const Input = ({ min, className, type, placeholder, name, icon, onChange}) => (
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
      onChange={onChange}
    />
  </div>
);

Input.defaultProps = {
  className: 'inputLogin'
};

export default Input;