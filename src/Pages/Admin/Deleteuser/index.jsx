import React, { useState } from 'react';
import AdminTemplate from '../adminTemplate';
import Input from '../../../Components/input';
import Button from '../../../Components/button';
import { AuthDeleteUser } from '../../../Service/api';

const DeleteUser = () =>{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)
  const [uid, setUid] = useState('')

  const token = localStorage.getItem('Token');

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try { 
      const contentApi = await AuthDeleteUser(uid, token)
      const content = await contentApi.json()

      if (contentApi.status !== 200) {
        setError(content.message);
      }
      else{
        if (contentApi.status === 200){
          setSuccess('Usuário deletado com sucesso!');
        }
      }
    }catch (e) {
      setLoading(false);
      setError('Erro desconhecido');
    }
  };
  return (
    <AdminTemplate>
      <form className="formLogin">
        <h1>DELETAR UM USUÁRIO</h1>
        {Boolean(loading) && (
          <i className="ph-spinner">Carregando</i>
        )}
        {Boolean(error) && (
          <h1 className="msgError">{error}</h1>
        )}
        {Boolean(success) && (
        <h1 className="msgSuccess">{success}</h1>
        )}
        <div className="infoLogin">
          <h1>ID do Funcionário</h1>
          <Input
            className='inputLogin'
            type="text"
            placeholder="Número de identificação do funcionário"
            name="id"
            icon={<i className="ph-circle-wavy-check"></i>}
            value={uid}
            onChange={(e)=> {setUid(e.target.value)}}
          />
        </div>
        <Button title="DELETAR" onClick={handleDeleteUser} />
      </form>
    </AdminTemplate>
  );
};

export default DeleteUser;