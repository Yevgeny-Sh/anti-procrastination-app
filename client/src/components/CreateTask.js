//import * as React from "react";
//import ReactDOM from "react-dom";
//import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api/api";

export default function CreateTask() {
  const history = useHistory();

  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState(1);
  const [urgency, setUrgency] = useState(1);
  const [willingness, setWillingness] = useState(1);
  const [reason, setReason] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const onImportanceChange = (event) => {
    setImportance(event.target.value);
  };
  const onUrgencyChange = (event) => {
    setUrgency(event.target.value);
  };
  const onWillingnessChange = (event) => {
    setWillingness(event.target.value);
  };
  const onReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleCreate = async () => {
    const task = {
      description,
      importance,
      urgency,
      willingness,
      reason,
    };
    const token = JSON.parse(sessionStorage.getItem("token"));

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.post("/tasks", task, requestOptions);
      if (res.data) {
        setIsCreated(true);
      }
    } catch (error) {
      console.dir(error);
      setErrorMsg(error.response.data.message.slice(42));
    }
  };
  return (
    <>
      <div>description: </div>
      <input
        value={description}
        placeholder="description"
        onChange={onDescriptionChange}
      />
      <div>importance: </div>
      <input
        type="range"
        name="cowbell"
        min="1"
        max="10"
        value={importance}
        step="1"
        onChange={onImportanceChange}
      ></input>

      <div>urgency: </div>
      <input
        type="range"
        name="cowbell"
        min="1"
        max="10"
        value={urgency}
        step="1"
        onChange={onUrgencyChange}
      ></input>

      <div>willingness: </div>
      <input
        type="range"
        name="cowbell"
        min="1"
        max="10"
        value={willingness}
        step="1"
        onChange={onWillingnessChange}
      ></input>

      <div>reason: </div>
      <input value={reason} placeholder="reason" onChange={onReasonChange} />
      <button className="create-btn" onClick={handleCreate}>
        create
      </button>
      {errorMsg ? (
        <div className="errorMsg">error:{errorMsg}</div>
      ) : (
        <div></div>
      )}
      {isCreated ? (
        <div className="isCreated">
          new task created!
          <button className="button icon-left" onClick={history.goBack}>
            go back
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
