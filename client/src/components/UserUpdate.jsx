import React, { useState } from "react";
import api from "../api/api";
export default function UserUpdate() {
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
  const handleUpdate = async (event) => {
    const user = {
      name,
      email,
      password,
    };
    console.log(user);
    try {
      await api.put("/users/me", user);
      console.log("posted");
    } catch (error) {
      console.log(error);
    }
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
      <button className="create-btn" onClick={handleUpdate}>
        login
      </button>
    </>
  );
}
