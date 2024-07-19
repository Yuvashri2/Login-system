import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import PremiumContent from "./Premium-content";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import React, { useState, useEffect } from "react";
import { getUser, getToken, setUserSession, resetUserSession } from "./service/AuthService";
import axios from "axios";
 
const verifyTokenAPIURL = 'https://9vzyr5o0sh.execute-api.eu-north-1.amazonaws.com/dev/verify';

function App() {

  const [isAuthenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      setAuthenticating(false);
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': 'Auc6JXu2UyRXj3LZOnPK9862sAAPYT6tO0yWF100'
      }
    }
    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenticating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenticating(false);
    })
  }, []);

  const token = getToken();
  if (isAuthenticating && token) {
    return <div className="content">Authenticating...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
          <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>Register</NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink>
          <NavLink to="/premium-content" className={({ isActive }) => (isActive ? "active" : "")}>Premium Content</NavLink>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PublicRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/premium-content" element={<PremiumContent />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
