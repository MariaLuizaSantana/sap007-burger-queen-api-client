import React from 'react';
import './input.css';

const Input = ({ type, placeholder, name, icon, onChange, value }) => (
  <div className="inputLoginContainer">
    <div className="inputLoginIcon">
      {icon}
    </div>

    <input
      className="inputLogin"
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
    />
  </div>
);

export default Input;