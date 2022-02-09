import React, { useState, useEffect } from "react";
import { Spin, Card } from "antd";

import api from "../api/api";
export default function UsersTasks() {
  const [loading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

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
        setTasks(res.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //
  const renderTasks = () => {
    if (tasks) {
      const renderedResults = tasks.map((task) => {
        return (
          <Card className="task-card" key={task._id}>
            <p> description:{task.description}</p>
            <p> importance:{task.importance}</p>
            <p> urgency:{task.urgency}</p>
            <p> willingness:{task.willingness}</p>
            <button
              className="button delete-task-btn"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              completed
            </button>
          </Card>
        );
      });
      return renderedResults;
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (taskId) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    let myTasks = tasks;
    if (myTasks) {
      await api.delete(`/tasks/${taskId}`, requestOptions);
      const task = tasks.find((elm) => (elm._id = taskId));
      const index = myTasks.indexOf(task);
      if (index > -1) {
        myTasks.splice(index, 1);
      }
      console.log(tasks);
      //creates new array to force re-render
      setTasks([...myTasks]);
    }
  };
  const completeTask = async (taskId) => {
    let myTasks = tasks;
    if (myTasks) {
      const task = tasks.find((elm) => (elm._id = taskId));
      const index = myTasks.indexOf(task);
      if (index > -1) {
        //myTasks.splice(index, 1);
        //mark completed
      }
      //creates new array to force re-render
      setTasks([...myTasks]);
    }
  };
  return (
    <div className="spinner-container">
      {loading ? <Spin size="large" /> : <div>tasks: {renderTasks()}</div>}
    </div>
  );
}
