import React, { useState, useEffect } from "react";
//import { Layout } from "antd";
import { Card, Spin } from "antd";
import api from "../api/api";
export default function CompletedTasks() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [loading, setIsLoading] = useState(true);

  //   const [loading, setIsLoading] = useState(true);

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
        setTasks(res.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    // if (tasks) {
    const getCompletedTasks = () => {
      let completedTasks = tasks.filter((task) => task.isCompleted);
      console.log(completedTasks);
      setCompletedTasks(completedTasks);
    };
    getCompletedTasks();
    // }
  }, [tasks]);

  const renderCompletedTasks = () => {
    //const renderTasks = (tasks) => {
    let taskToRender = "";
    const renderedResults = completedTasks.map((task) => {
      //  if (!task.isCompleted) {
      taskToRender = (
        <Card className="task-card" key={task._id}>
          <p> description:{task.description}</p>
          <p> category:{task.category}</p>
          <p> importance:{task.importance}</p>
          <p> urgency:{task.urgency}</p>
          <p> willingness:{task.willingness}</p>
          <p> task created at:{task.createdAt.slice(0, -14)}</p>
          <p> task due at :{task.dueDate.slice(0, -14)}</p>
        </Card>
      );
      //} else return null;
      return taskToRender;
    });
    return renderedResults;
    // };
  };

  return <div>{loading ? <Spin size="large" /> : renderCompletedTasks()}</div>;
}
