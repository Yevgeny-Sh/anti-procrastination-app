import React, { useState, useEffect } from "react";
//import { Layout } from "antd";
import { Card, Spin } from "antd";
import api from "../api/api";

export default function ProcrastinatedTasks() {
  const [tasks, setTasks] = useState([]);
  const [procTasks, setProcTasks] = useState([]);
  const [loading, setIsLoading] = useState(true);

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
    const getProcTasks = () => {
      let procTasks = tasks.filter(
        (task) => Date.parse(task.dueDate) <= Date.now()
      );
      console.log(procTasks);
      setProcTasks(procTasks);
    };
    getProcTasks();
  }, [tasks]);

  const renderProcrastinatedTasks = () => {
    let procrastinatedTask = "";
    const renderedResults = procTasks.map((task) => {
      if (!task.isCompleted) {
        procrastinatedTask = (
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
      } else return null;
      return procrastinatedTask;
    });
    return renderedResults;
  };

  return (
    <div>{loading ? <Spin size="large" /> : renderProcrastinatedTasks()}</div>
  );
}
