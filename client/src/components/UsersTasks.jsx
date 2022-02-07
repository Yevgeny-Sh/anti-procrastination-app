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
        console.log(res.data);
        setData(res.data[0].description);
      }
    } catch (error) {
      console.log(error.response);
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
          {/* <button
            className="button icon-left"
            onClick={}
          >
            Back
          </button> */}
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
