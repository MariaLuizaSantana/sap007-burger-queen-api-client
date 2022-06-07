import React, { useState, useEffect } from 'react';
import WaiterTemplate from '../waiterTemplate';
import Button from '../../Components/button';
import './menu.css'
import Operator from '../../Components/operator';
import Input from '../../Components/input';
import { AuthGetProduct, CreateOrder } from '../../Service/api';
import { Navigate } from 'react-router-dom';


const WaiterMenu = () =>{
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('breakfast');
  const [orderItems, setOrderItems] = useState([]);
  // const [info, setInfo] = useState({
  //   client:'',
  //   table:'',
  // })
  const [client, setClient] = useState('')
  const [table, setTable] = useState('')
  const token = localStorage.getItem('Token');

  const getProducts = async () => {

    
    try {
      const contentApi = await AuthGetProduct(token);
      const content = await contentApi.json();

      if (contentApi.status !== 200) {
        setError(content.message);
      } else {
        if (contentApi.status === 200){
          setProducts(content);
        }
      }
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
    const found = orderItems.find((foundItem) => {
      return foundItem.id === item.id
    })
    
    if (found) {
      const newOrder = orderItems.map((orderItem) => {
        if (found.id !== orderItem.id) {
          return orderItem
        } else {
          return {
            ...orderItem,
            qtd: orderItem.qtd ? orderItem.qtd + 1 :  1
          }
        }
      })
      setOrderItems(newOrder);
    } else {
      setOrderItems([
        ...orderItems,
        {
          ...item,
          qtd:1
        },
      ]);
    }
  }

  const removeItemToOrder = (item) => {
    let refreshOrder = [...orderItems];
    const found = refreshOrder.find((foundItem) => {
      return foundItem.id === item.id
    })
    if (found.qtd > 1){
      found.qtd -= 1
    }
    else{
      refreshOrder = refreshOrder.filter((refreshItem) => refreshItem.id !== item.id)
    }
    setOrderItems(refreshOrder)
  }

  const sumPrice = () => {
    return orderItems.reduce((total, products) => {
      return total + (products.price * (products.qtd || 1))
    }, 0)
  }

  const handleProducts = async () => {

    const orderProducts = orderItems.map((item)=>({
          id: item.id,
          qtd: item.qtd
       }))

    const contentApi = await CreateOrder(token, client, table, orderProducts);
    const content = await contentApi.json();

    if (contentApi.status !== 200) {
      setError(content.message);
    } else if (contentApi.status === 200){
      if(client == '' || table == ''){
        setError('Preencha todos os campos')
      }
     else if(orderItems.length == 0){
        setError('Comanda vazia')
      }
     else{
      setSuccess('Pedido mandado para cozinha');
      // content(orderProducts)
      // .then (() => {
      //   Navigate('/order')
      // })
      // .catch((error) => error)
      }
      }
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
        {Boolean(success) && (
          <h1 className="msgSuccess">{success}</h1>
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
            <section className='productsOrder'>
                <h1 className='productName'>PEDIDO</h1>
                <h1 className='orderClient'>CLIENTE</h1>
                <Input
                className="inputOrderContainer"
                type="text"
                name="client"
                value={client}
                onChange={(e)=> {setClient(e.target.value)}}
                />
                <h1 className='orderClient'>MESA</h1>
                <Input
                className="inputOrderContainer"
                type="number"
                name="table"
                min="0"
                value={table}
                onChange={(e)=> {setTable(e.target.value);console.log(table)}}
                />
            {orderItems.map((orderProduct, key) => (
              <div className='cardOrder' key={key}>
                <h1 className='orderName'>{orderProduct.name} x{orderProduct.qtd}</h1>
                {console.log(orderProduct.qtd)}
                <p className='orderFlavor'>{orderProduct.flavor}</p>
                <p className='orderFlavor'>{orderProduct.complement}</p>
                <Operator clickFunction={() => removeItemToOrder(orderProduct)} calculator='-' />
              </div>
            ))}
              <h1 className='productTotal'>{`TOTAL: R$${sumPrice()},00`}</h1>
            </section>
            <div>
              <Button className="buttonLogin sendOrder" title="ENVIAR PEDIDO" onClick={handleProducts} />
            </div>
        </div>
    </WaiterTemplate>
  );
}

export default WaiterMenu;
