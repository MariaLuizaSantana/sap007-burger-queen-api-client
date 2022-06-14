import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../img/logo_bq.png';
import './login.css';
import Input from '../../Components/input';
import Button from '../../Components/button';
import Footer from '../../Components/footer';
import { AuthUser } from '../../Service/api';

const Login = () => {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const contentApi =  await AuthUser(email, password)
      const content = await contentApi.json();

      if (contentApi.status !== 200) {
        setError(content.message);
    } else {
        if (content.role === 'waiter') {
            navigate('/waiter');
        } else if (content.role === 'chef') {
            navigate('/chef');
        } else if (content.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/not-found');
        }
    }
    localStorage.setItem('Token', content.token);
    } catch { 
      setLoading(false);
      setError('Erro desconhecido');
    }
  } 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          SERVICE SYSTEM
        </p>

        {Boolean(loading) && (
          <i className="ph-spinner">Carregando</i>
        )}

        {Boolean(error) && (
          <h1 className="msgError">{error}</h1>
        )}

        <form className="formLogin">
          <div className="infoLogin">
            <h1>E-mail</h1>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              icon={<i className="ph-envelope"></i>}
              value={email}
              onChange={(e)=> {setEmail(e.target.value)}}
            />
          </div>
          <div className="infoLogin">
            <h1>Senha</h1>
            <Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              icon={<i className="ph-lock-key"></i>}
              value={password}
              onChange={(e)=> {setPassword(e.target.value)}}
            />
          </div>
          <Button title="ENTRAR" onClick={handleLogin}/>
        </form>
      </header>
      <Footer />
    </div>
  );
}

export default Login;