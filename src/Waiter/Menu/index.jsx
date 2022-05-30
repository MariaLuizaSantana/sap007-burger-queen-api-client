import React, { useState, useEffect } from 'react';
import WaiterTemplate from '../waiterTemplate';
import Button from '../../Components/button';
import Operator from '../../Components/operator';
import './menu.css'
import Command from './command';


const WaiterMenu = () =>{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [counter, setCounter] = useState(0)

  const getProducts = async () => {
    setLoading(true);
    setError(false);

    const token = localStorage.getItem('Token');

    try {
      const resultApi = await fetch('https://lab-api-bq.herokuapp.com/products', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token,
        },
      });
      const content = await resultApi.json();
      setLoading(false);

      if (resultApi.status !== 200) {
        setError(content.message);
      } else {
        if (resultApi.status === 200){
          setProducts(content);
          console.log(token)
        }
      }
      localStorage.setItem('id', content.id);
    } catch (e) {
      setLoading(false);
      setError('Erro desconhecido');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const productsFilter = products.filter((product) => {
    if (product.sub_type === filter) {
      return true;
    } else{
      return false;
    }
  });
  
  function increment(){
    // console.log('aumenta')
     setCounter(counter + 1)
   } 

  return (
    <WaiterTemplate>
      <h1>CARDÁPIO</h1>
        
        {Boolean(loading) && (
          <i className="ph-spinner">Carregando</i>
        )}

        {Boolean(error) && (
          <h1 className="msgError">{error}</h1>
        )}
        <div className='btnMenu'>
        <Button title="Café da Manhã" onClick={() => setFilter('breakfast')}/>
        <Button title="Lanches" onClick={() => setFilter('hamburguer')} />
        <Button title="Acompanhamentos" onClick={() => setFilter('side')} />
        <Button title="Bebidas" onClick={() => setFilter('drinks')} />
        </div>
        <div className='productsMenu'>
        {productsFilter.map((product) => (
          <div className='cardMenu'>
            <h1 className='productName'>{product.name}</h1>
            {<img className='imgMenu' src={product.image}/>}
            <p className='productFlavor'>{product.flavor}</p>
            <p className='productComplement'>{product.complement}</p>
            <div className='productLinePrice'>
            <p className='productPrice'>R$ {product.price},00</p>
            <Operator clickFunction={() => console.log(product.id)} calculator='+'/>
            </div>
          </div>
        ))}
        </div>
    </WaiterTemplate>
  );
}

export default WaiterMenu;