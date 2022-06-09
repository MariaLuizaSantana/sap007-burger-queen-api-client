import React, { useState } from 'react';
import ChefTemplate from '../chefTemplate';
import { ListOrder } from '../../Service/api';
import Button from '../../Components/button';

const ChefAllOrders = () =>{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const token = localStorage.getItem('Token');
  const [order, setOrder] = useState([]);

  const handleListAllOrders = async (e) => {
    e.preventDefault()

    try {
      const contentApi =  await ListOrder(token);
      const content = await contentApi.json();

      if (contentApi.status !== 200) {
        setError(content.message);
      } else {
        if (contentApi.status === 200){
          setOrder(content);
          console.log(content)
        }
      }
    } catch { 
      setLoading(false);
      setError('Erro desconhecido');
    }
  }

  // const allOrders = order.filter((orders) => {
  //   if (orders.sub_type === filter) {
  //     return true;
  //   } else{
  //     return false;
  //   }
  // });

  return (
    <ChefTemplate>
      <p>Todos os Pedidos</p>

      {Boolean(loading) && (
          <i className="ph-spinner">Carregando</i>
      )}

      {Boolean(error) && (
          <h1 className="msgError">{error}</h1>
      )}

      <div>
        <Button className="buttonLogin" title="Listar Pedidos" onClick={handleListAllOrders} />
      </div>

    </ChefTemplate>
  );
}

export default ChefAllOrders;