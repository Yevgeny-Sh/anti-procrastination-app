import React, { useState, useEffect } from "react";
import { Spin, Card, Button } from "antd";

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
        setTasks(res.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //
  const renderTasks = () => {
    let nonCompletedTasks = "";
    if (tasks) {
      const renderedResults = tasks.map((task) => {
        if (!task.isCompleted) {
          nonCompletedTasks = (
            <Card className="task-card" key={task._id}>
              <p> description:{task.description}</p>
              <p> category:{task.category}</p>
              <p> importance:{task.importance}</p>
              <p> urgency:{task.urgency}</p>
              <p> willingness:{task.willingness}</p>
              <p> task created at:{task.createdAt.slice(0, -14)}</p>
              <p> task due at :{task.dueDate.slice(0, -14)}</p>

              <Button
                className="button complete-task-btn"
                onClick={() => {
                  completeTask(task._id);
                }}
              >
                completed
              </Button>
              <Button
                className="button delete-task-btn"
                onClick={() => {
                  deleteTask(task._id);
                }}
              >
                delete task
              </Button>
            </Card>
          );
        }
        return nonCompletedTasks;
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
        task.isCompleted = true;
      }
      //creates new array to force re-render
      setTasks([...myTasks]);
    }
  };
  return (
    <div className="spinner-container">
      {loading ? (
        <Spin size="large" />
      ) : (
        <div>
          {" "}
          <div>tasks:</div> {renderTasks()}
        </div>
      )}
    </div>
  );
}
