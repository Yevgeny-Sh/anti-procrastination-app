import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import api from "../api/api";

export default function UserLogin() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [name, setName] = useState("");

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
        setTokenInStorage(res.data.token);
        let currUser = res.data.user;
        let path = `/login/me`;
        //history.push(path);
        history.push({
          pathname: path,
          state: { currUser },
        });
      }
    } catch (error) {
      console.log(error);
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
      <button className="login-btn" onClick={handleLogin}>
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
