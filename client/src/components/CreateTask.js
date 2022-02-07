import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../api/api";

export default function CreateTask() {
  //import { Link } from "react-router-dom";

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
      setErrorMsg(error.response);
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
        value={importance}
        placeholder="importance"
        onChange={onImportanceChange}
      />
      <div>urgency: </div>
      <input value={urgency} placeholder="urgency" onChange={onUrgencyChange} />
      <div>willingness: </div>
      <input
        value={willingness}
        placeholder="urgency"
        onChange={onWillingnessChange}
      />
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
            Back
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
