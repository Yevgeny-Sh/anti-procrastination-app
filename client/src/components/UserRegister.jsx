import React, { useState } from "react";
import api from "../api/api";

export default function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    };
    console.log(newItem);
    await api.post("/users", newItem);
  };
  return (
    <>
      <div>name: {name}</div>
      <input value={name} placeholder="name" onChange={onNameChange} />
      <div>email: {email}</div>
      <input value={email} placeholder="email" onChange={onEmailChange} />
      <div>password: {password}</div>
      <input
        value={password}
        placeholder="password"
        onChange={onPasswordChange}
      />
      <button className="create-btn" onClick={handleCreate}>
        register new user
      </button>
    </>
  );
}
