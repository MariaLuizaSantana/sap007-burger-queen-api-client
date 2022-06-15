import React, { useState } from 'react';
import AdminTemplate from '../adminTemplate';
import Input from '../../../Components/input';
import Button from '../../../Components/button';
import Select from '../../../Components/select';
import { AuthUpdateUser } from '../../../Service/api';

const UpdateUser = () =>{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const token = localStorage.getItem('Token');

  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      const contentApi = await AuthUpdateUser(uid,token,name,role);
      const content = await contentApi.json();

      if (contentApi.status !== 200) {
        setError(content.message);
      }
      else {
        if (contentApi.status === 200){
          setSuccess('Usuário atualizado com sucesso!');
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
        <h1>ATUALIZAR UM USUÁRIO (NOME E CARGO)</h1>
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
            name="uid"
            icon={<i className="ph-circle-wavy-check"></i>}
            value={uid}
            onChange={(e)=>{setUid(e.target.value)}}
          />
        </div>
        <div className="infoLogin">
          <h1>Nome do Funcionário</h1>
          <Input
            className='inputLogin'
            type="text"
            placeholder="Novo nome do funcionário"
            name="name"
            icon={<i className="ph-user"></i>}
            value={name}
            onChange={(e)=> {setName(e.target.value)}}
          />
        </div>
        <Select value={role} onChange={(e)=> setRole(e.target.value)} />
        <Button title="ATUALIZAR" onClick={onUpdate}/>
      </form>
    </AdminTemplate>
  );
};

export default UpdateUser;
