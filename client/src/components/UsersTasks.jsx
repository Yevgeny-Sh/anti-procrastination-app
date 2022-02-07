import React, { useState, useEffect } from "react";
//import { useHistory } from "react-router-dom";
import api from "../api/api";
export default function UsersTasks() {
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState("");

  const getTasks = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.get("/tasks", requestOptions);
      if (res.data) {
        setIsLoading(false);
        console.log(res);
        setData(res);
      } else console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <>
      {loading ? (
        <div className="loading">
          loading!
          <button
            className="button icon-left"
            onClick={console.log("history.goBack")}
          >
            Back
          </button>
        </div>
      ) : (
        <div>
          taskks
          {data}
        </div>
      )}
    </>
  );
}
