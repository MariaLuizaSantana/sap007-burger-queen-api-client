import React, { useState } from 'react';
import WaiterTemplate from '../waiterTemplate';
import { ListOrder } from '../../../Service/api';
import { useEffect } from 'react';
import Button from '../../../Components/button';

const WaiterOrder = () =>{
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('status');
  const [order, setOrder] = useState([]);

  const token = localStorage.getItem('Token');

  const getAllOrder = async () => {

    try{
      const contentApi = await ListOrder(token);
      const content = await contentApi.json();
      if (contentApi.status !== 200) {
        setError(content.message);
      } else {
        if (contentApi.status === 200){
          setSuccess(false);
          setOrder(content);
        }
      }
    }catch(e){
      setLoading(false);
      setError('Erro desconhecido');
    }
  }

  useEffect(() => {
    getAllOrder();
  }, []);

  const orderFilter = order.filter((order) => {
    if (order.status === filter) {
      return true;
    } else{
      return false;
    }
  });

  return (
    <WaiterTemplate>
      <p>Página de Pedidos</p>

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
          <Button className="buttonLogin buttonOrder" title="Pendente" onClick={() => setFilter('pending')}/>
          <Button className="buttonLogin buttonOrder" title="Em Preparo" onClick={() => setFilter('inPreparation')} />
          <Button className="buttonLogin buttonOrder" title="Pronto" onClick={() => setFilter('ready')} />
          <Button className="buttonLogin buttonOrder" title="Entregue" onClick={() => setFilter('served')} />
        </div>
        <section>
        {orderFilter.map((order) => {
          return (
            <div className='cardMenu' key={order.id}>
              <h1 className='productName'>{order.client_name}</h1>
              <div>{order.Products.map((products) => {
                return (
                  <div key={products.id}>
                    <p className='productComplement'>{products.name}</p>
                    <p className='productComplement'>{products.flavor}</p>
                    <p className='productComplement'>{products.complement}</p>
                    <p className='productComplement'>{products.qtd}</p>
                  </div>                    
              )})}
              </div>
              <p className='productComplement'>Mesa: {order.table}</p>
              <p className='productComplement'> Status: {order.status}</p>
              <div className='productLinePrice'>
              </div>
            </div>
          )})}
        </section>
    </WaiterTemplate>
  );
}

export default WaiterOrder;
