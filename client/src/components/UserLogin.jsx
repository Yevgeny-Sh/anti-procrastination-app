import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import api from "../api/api";

export default function UserLogin() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const setTokenInStorage = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
  };

  const handleLogin = async () => {
    const user = {
      email,
      password,
    };
    try {
      const res = await api.post("/users/login", user);
      if (res.data) {
        //setToken(data.token);
        setTokenInStorage(res.data.token);
        let path = `/login/me`;
        history.push(path);
      }
    } catch (error) {
      setErrorMsg(error.response.data.error);
    }
  };
  return (
    <>
      <div>email: {email}</div>
      <input value={email} placeholder="email" onChange={onEmailChange} />
      <div>password: {password}</div>
      <input
        value={password}
        placeholder="password"
        onChange={onPasswordChange}
      />
      <button className="create-btn" onClick={handleLogin}>
        login
      </button>
      {errorMsg ? (
        <div className="errorMsg">error:{errorMsg}</div>
      ) : (
        <div></div>
      )}
    </>
  );
}
