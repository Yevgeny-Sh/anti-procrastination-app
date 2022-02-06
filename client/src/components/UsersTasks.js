import React, { useState, useEffect } from "react";
import api from "../api/api";

export default function UsersTasks() {
  const [isPosted, setIsPosted] = useState(false);

  const getTasks = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await api.get("/tasks", requestOptions);
      if (response) {
        console.log(response);
        setIsPosted(true);
      }
    } catch (error) {
      console.log(error.response);
    }
    return <div>hi</div>;
  };

  useEffect(() => {
    getTasks();
  });
  return "UsersTasks";
}
