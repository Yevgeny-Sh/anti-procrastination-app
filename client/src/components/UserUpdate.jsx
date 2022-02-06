import React, { useState } from "react";
import api from "../api/api";
export default function UserUpdate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUpdate = async () => {
    const user = {
      name,
      email,
      password,
    };
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      console.log(token);
      const requestOptions = {
        method: "PUT",
        //token
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await api.put("/users/me", user, requestOptions);
      //await api.put("/users/me", user);
      console.log("posted");
    } catch (error) {
      console.log(error.response);
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
