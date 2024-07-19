import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './service/AuthService';
import { useNavigate } from 'react-router-dom';

const loginAPIUrl = 'https://9vzyr5o0sh.execute-api.eu-north-1.amazonaws.com/dev/login';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
 
    const submitHandler = (event) => {
      event.preventDefault();
      if (username.trim() === '' || password.trim() === '') {
        setErrorMessage('Both username and password are required');
        return;
      }
    
    
      const requestConfig = {
        headers: {
          'x-api-key': 'Auc6JXu2UyRXj3LZOnPK9862sAAPYT6tO0yWF100'
        }
      }


      const requestBody = {
        username: username,
        password: password
      }

      axios.post(loginAPIUrl, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        navigate('/premium-content');      
       
      })
      .catch((error) => {
        console.log('bye');if (error.response.status === 401 || error.response.status === 403)
        {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('sorry....the backend server is down. please try again later!!');
        }
      })
    }

  

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Login</h5>
        username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
        password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
        <input type="submit" value="Login"/>
      </form>
      {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  )
}

export default Login;
