import React from 'react';
import './button.css';

const Button = (
  className, title, onClick) => (

  <button
    type="submit"
    className={className}
    onClick={onClick}
  >
    {title}
  </button>
);

Button.defaultProps = {
  className: 'buttonLogin',
};
export default Button;
