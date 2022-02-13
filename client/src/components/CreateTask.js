//import * as React from "react";
//import ReactDOM from "react-dom";
//import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Radio, DatePicker, Button } from "antd";
import { Layout } from "antd";
import api from "../api/api";
const { Header, Content } = Layout;

export default function CreateTask() {
  const history = useHistory();

  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState(1);

  const [urgency, setUrgency] = useState(1);
  const [willingness, setWillingness] = useState(1);
  const [reason, setReason] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [category, setCategory] = useState("");

  const [dueDate, setDueDate] = useState("");

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
  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  // const onDueDateChange = (event) => {
  //   setDueDate(event.target.value);
  //   console.log(dueDate);
  // };
  function onDueDateChange(date, dateString) {
    console.log(dateString);
    setDueDate(dateString);
  }

  const handleCreate = async () => {
    const task = {
      description,
      category,
      importance,
      urgency,
      willingness,
      reason,
      dueDate,
    };
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log(task);
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
    <Layout>
      <Header className="layout-header">Create new Task</Header>
      <Content>
        <>
          <div>description: </div>
          <input
            value={description}
            placeholder="description"
            onChange={onDescriptionChange}
          />
          <div>category: </div>
          <Radio.Group onChange={onCategoryChange} value={category}>
            <Radio value={"work"}>work</Radio>
            <Radio value={"academic"}>academic</Radio>
            <Radio value={"birocratic"}>birocratic</Radio>
            <Radio value={"social"}>social</Radio>
            <Radio value={"medical"}>medical</Radio>
          </Radio.Group>

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
          <br></br>
          <DatePicker onChange={onDueDateChange} />

          <div>reason for procrastination: </div>
          <input
            value={reason}
            placeholder="reason"
            onChange={onReasonChange}
          />
          <br></br>
          <Button type="primary" className="create-btn" onClick={handleCreate}>
            create
          </Button>
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
      </Content>
    </Layout>
  );
}
