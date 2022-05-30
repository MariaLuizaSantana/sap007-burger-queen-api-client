import React, { useState, useEffect } from 'react';
import Input from '../../Components/input';
import Operator from '../../Components/operator';


const Command = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [productsSelected, setproductsSelected] = useState([]);
    const [filter, setFilter] = useState('');
    const [productQtd, setProductQtd] = useState('');
  
    const getProductsSelected = async (e) => {
      setLoading(true);
      setError(false);
  
      const token = localStorage.getItem('Token');
      const client = e.target.client.value;
      const table = e.target.table.value;
      const id = e.target.table.value;
      const qtd = e.target.table.value;
  
  
      try {
        const resultApi = await fetch('https://lab-api-bq.herokuapp.com/orders', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            client: client,
            table: table,
            products: [{
              id: id,
              qtd: qtd,
            }]
          }), 
        });
        const content = await resultApi.json();
        setLoading(false);
  
        if (resultApi.status !== 200) {
          setError(content.message);
        } else {
          if (resultApi.status === 200){
            setproductsSelected(content);
          }
        }
      } catch (e) {
        setLoading(false);
        setError('Erro desconhecido');
      }
    };
  
    useEffect(() => {
      getProductsSelected();
    }, []);

    const productsSelectedFilter = productsSelected.filter((selected) => {
      if (selected.id === filter) {
        return true;
      } else{
        return false;
      }
    });


    return (
        <article>   
            {Boolean(error) && (
                <h1 className="msgError">{error}</h1>
            )}
            <h1>Pedido</h1>
                <div>
                {productsSelectedFilter.map((selected) => (
                  <article>
                    <p>Cliente: <Input type='text' name='client'></Input> </p>
                    <p>Mesa: <Input type='number' name='table'></Input> </p>
                    <div {...setFilter('id')}>
                      {selected.name}
                      {selected.flavor}
                      {selected.complement}
                      <Operator clickFunction={(selected=setProductQtd - 1 )} calculator='-'/>
                      <Operator clickFunction={(selected=setProductQtd + 1 )} calculator='+'/>
                    </div>
                  </article>
                    ))}
                </div>
        </article>
    )
}

export default Command