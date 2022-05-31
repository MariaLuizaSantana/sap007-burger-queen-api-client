import React, { useState, useEffect } from 'react';
import WaiterTemplate from '../waiterTemplate';
import Button from '../../Components/button';
import './menu.css'
import Operator from '../../Components/operator';
import Input from '../../Components/input';
import { AuthGetProduct } from '../../Service/api';

const WaiterMenu = () =>{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('breakfast');
  const [orderItems, setOrderItems] = useState([]);

  const token = localStorage.getItem('Token');

  const getProducts = async (e) => {
    
    try {
      const contentApi = await AuthGetProduct(token)
      const content = await contentApi.json();

      if (contentApi.status !== 200) {
        setError(content.message);
      } else {
        if (contentApi.status === 200){
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

  const addItemToOrder = (item) => {
    setOrderItems([
      ...orderItems,
      item,
    ]);
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
          <Button className="buttonLogin buttonOrder" title="Café da Manhã" onClick={() => setFilter('breakfast')}/>
          <Button className="buttonLogin buttonOrder" title="Lanches" onClick={() => setFilter('hamburguer')} />
          <Button className="buttonLogin buttonOrder" title="Acompanhamentos" onClick={() => setFilter('side')} />
          <Button className="buttonLogin buttonOrder" title="Bebidas" onClick={() => setFilter('drinks')} />
        </div>
        <div className='tela-menu'>
          <section className='productsMenu'>
          {productsFilter.map((product) => (
            <div className='cardMenu' key={product.id}>
              <h1 className='productName'>{product.name}</h1>
              {<img className='imgMenu' src={product.image}/>}
              <p className='productFlavor'>{product.flavor}</p>
              <p className='productComplement'>- {product.complement}</p>
              <div className='productLinePrice'>
                <p className='productPrice'>R$ {product.price},00</p>
                <Operator clickFunction={() => addItemToOrder(product)} calculator='+'/>
              </div>
            </div>
          ))}
          </section>
          <form>
            <section className='productsOrder'>
                <h1 className='productName'>PEDIDO</h1>
                <h1 className='orderClient'>CLIENTE</h1>
                <Input
                className="inputOrderContainer"
                type="text"
                name="client"
                icon={<i className="ph-crown"></i>}
                />
                <h1 className='orderClient'>MESA</h1>
                <Input
                type="number"
                name="table"
                icon={<i className="ph-map-pin"></i>}
                />
            {orderItems.map((orderProduct) => (
              <div className='cardOrder' key={orderProduct}>
                <h1 className='orderName'>{orderProduct.name}</h1>
                <p className='orderFlavor'>{orderProduct.flavor}</p>
                <p className='orderFlavor'>{orderProduct.complement}</p>
              </div>
            ))}
              <h1 className='productTotal'>TOTAL:</h1>
            </section>
            <div>
              <Button className="buttonLogin sendOrder" title="ENVIAR PEDIDO" />
            </div>
          </form>
        </div>
    </WaiterTemplate>
  );
}

export default WaiterMenu;
