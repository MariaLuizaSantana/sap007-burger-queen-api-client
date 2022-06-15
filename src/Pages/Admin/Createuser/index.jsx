import React, { useState } from 'react';
import AdminTemplate from '../adminTemplate';
import Input from '../../../Components/input';
import Button from '../../../Components/button';
import Select from '../../../Components/select';
import { CreateNewUser } from '../../../Service/api';

const CreateUser = () =>{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')


  const handleCreateUser = async (e) => {
    e.preventDefault()
    try {
      const contentApi = await CreateNewUser(name, email, password, role)
      const content = await contentApi.json()

      if ( name == '') {
        setError('Preencha o campo do nome');
      }
      else if (email == ''){
        setError('Preencha o campo de email');
      }
      else if (password == ''){
        setError('Preencha o campo da senha')
      }
      else if (role == ''){
        setError('Preencha o campo do cargo');
      }
      else if(contentApi.status === 200){
        setSuccess('Usuário cadastrado com sucesso!')
      }
      else{
        setError(content.message)
      }
    }catch (e) {
      setLoading(false);
      setError('Erro desconhecido');
    }
  }
  return (
    <AdminTemplate>
      <form className="formLogin">
        <h1>CRIAR UM NOVO USUÁRIO</h1>
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
          <h1>Nome do Funcionário</h1>
          <Input
            className='inputLogin'
            type="text"
            placeholder="Nome do funcionário"
            name="name"
            icon={<i className="ph-user"></i>}
            value={name}
            onChange={(e)=> {setName(e.target.value)}}
          />
        </div>
        <div className="infoLogin">
          <h1>E-mail</h1>
          <Input
            className='inputLogin'
            type="email"
            placeholder="E-mail do funcionário"
            name="email"
            icon={<i className="ph-envelope"></i>}
            value={email}
            onChange={(e)=> {setEmail(e.target.value)}}
          />
        </div>
        <div className="infoLogin">
          <h1>Senha</h1>
          <Input
            className='inputLogin'
            type="password"
            placeholder="Senha Geral"
            name="password"
            icon={<i className="ph-lock-key"></i>}
            value={password}
            onChange={(e)=> {setPassword(e.target.value)}}
          />
        </div>
        <Select value={role} onChange={(e)=> {setRole(e.target.value)} }/>
        <Button title="CADASTRAR" onClick={handleCreateUser} />
      </form>
    </AdminTemplate>
  );
}

export default CreateUser;
