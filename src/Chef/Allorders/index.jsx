import React, { useState, useEffect } from 'react';
import ChefTemplate from '../chefTemplate';
import { ListOrder } from '../../Service/api';

const ChefAllOrders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const token = localStorage.getItem('Token');
  const [order, setOrder] = useState([]);

  const handleListAllOrders = async () => {
    try {
      const contentApi = await ListOrder(token);
      const content = await contentApi.json();

      if (contentApi.status !== 200) {
        setError(content.message);
      } else if (contentApi.status === 200) {
        setOrder(content);
      }
    } catch {
      setLoading(false);
      setError('Erro desconhecido');
    }
  };

  useEffect(() => {
    handleListAllOrders();
  }, []);

  return (
    <ChefTemplate>
      <p>Todos os Pedidos</p>

      {Boolean(loading) && (
        <i className="ph-spinner">Carregando</i>
      )}

      {Boolean(error) && (
        <h1 className="msgError">{error}</h1>
      )}

      <section>
        {order.map((item) => (
          <div className="cardMenu" key={item.id}>
            <h1 className="productName">{item.client_name}</h1>
            <p className="productComplement">{`Mesa: ${item.table}`}</p>
            <div>
              {item.Products.map((products) => (
                <div key={`product-${products.id}`}>
                  <p className="productComplement">
                    {products.name}
                    x
                    {products.qtd}
                  </p>
                  <p className="productComplement">{products.flavor}</p>
                  <p className="productComplement">{products.complement}</p>
                </div>
              ))}
            </div>
            <h1 className="productTotal">{`Status: ${item.status}`}</h1>
          </div>
        ))}
      </section>

    </ChefTemplate>
  );
};

export default ChefAllOrders;
