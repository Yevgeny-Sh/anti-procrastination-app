import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import api from "../api/api";

export default function UserLogin() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [wrongCred, setWrongCred] = useState(false);

  const onEmailChange = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    console.log(event.target.value);
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
    console.log(user);

    try {
      const { data } = await api.post("/users/login", user);
      setToken(data.token);
      setTokenInStorage(data.token);
      //go to another page
      //but check token before u let log in
      //await api.get("/users/me", user);

      let path = `/login/me`;

      history.push(path);
    } catch (error) {
      console.log(error);

      console.log("bbb");
      setWrongCred(!wrongCred);
      console.log(wrongCred);
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
      {wrongCred ? (
        <div className="wrongCred">wrong email or password, try again!</div>
      ) : (
        <div></div>
      )}
    </>
  );
}
