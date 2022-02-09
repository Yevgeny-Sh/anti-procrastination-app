import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Input, Card, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

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
        let path = `/log`;
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
    <Card>
      <Input
        value={email}
        className="input email-input"
        size="medium"
        placeholder="email"
        onChange={onEmailChange}
      />
      <br></br>
      <Input.Password
        className="input password-input"
        size="medium"
        placeholder="password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        onChange={onPasswordChange}
      />
      <br></br>
      <Button type="primary" className="login-btn" onClick={handleLogin}>
        login
      </Button>
      {errorMsg ? (
        <div className="errorMsg">error:{errorMsg}</div>
      ) : (
        <div></div>
      )}
    </Card>
  );
}
