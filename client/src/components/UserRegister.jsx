import React, { useState } from "react";
import { Input, Button } from "antd";
import { useHistory } from "react-router-dom";

import api from "../api/api";

export default function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPosted, setIsPosted] = useState(false);

  const history = useHistory();

  const onNameChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const onEmailChange = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const handleCreate = async (event) => {
    const newItem = {
      name,
      email,
      password,
      isActive: true,
    };
    try {
      await api.post("/users", newItem);
      setIsPosted(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>name: {name}</div>
      <Input
        className="input"
        value={name}
        placeholder="name"
        onChange={onNameChange}
      />
      <div>email: {email}</div>
      <Input
        className="input"
        value={email}
        placeholder="email"
        onChange={onEmailChange}
      />
      <div>password: {password}</div>
      <Input
        className="input"
        value={password}
        placeholder="password"
        onChange={onPasswordChange}
      />
      <br />
      <Button
        type="primary"
        className="create-btn input"
        onClick={handleCreate}
      >
        register new user
      </Button>
      {isPosted ? (
        <div>
          <Button onClick={history.goBack}>go back</Button>
        </div>
      ) : (
        <div />
      )}
    </>
  );
}
