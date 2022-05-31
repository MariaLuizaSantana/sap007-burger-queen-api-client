import React from 'react';
import './select.css';

const Select = ({onChange}) => (
    <select onChange={onChange} className='selectLogin' name='role'>
        <option value="">Selecione o cargo</option>
        <option value="admin">Administração</option>
        <option value="chef">Cozinheiro</option>
        <option value="waiter">Garçom</option>
    </select>
)

export default Select;