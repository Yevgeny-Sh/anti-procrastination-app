import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import api from "../api/api";

export default function UserLogin() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [token, setToken] = useState("");
  const [wrongCred, setWrongCred] = useState(false);
  const [error, setError] = useState("");

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
      const { data } = await api.post("/users/login", user);
      if (data) {
        //setToken(data.token);
        setTokenInStorage(data.token);
        //go to another page
        //but check token before u let log in
        //await api.get("/users/me", user);

        let path = `/login/me`;

        history.push(path);
      }
    } catch (error) {
      setError(error);
      setWrongCred(!wrongCred);
      console.log(error);
      //let path = `/login`;

      //history.push(path);
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
      {error ? <div className="errorMsg">{error}</div> : <div></div>}
      {wrongCred ? (
        <div className="wrongCred">wrong email or password, try again!</div>
      ) : (
        <div></div>
      )}
    </>
  );
}
