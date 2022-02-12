import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Button, Spin } from "antd";
import api from "../api/api";
const { Header, Content } = Layout;

export default function UsersStats() {
  const [loading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
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

  const proc = () => {
    let procTasks = tasks.filter(
      (task) => Date.parse(task.dueDate) <= Date.now()
    );
    let toPrint = "";
    console.log(procTasks);
    ////
    let statsArr = [0, 0];
    // index 0 = social
    // index 1 = non-social
    procTasks.forEach((task) => {
      if (task.category === "social") {
        statsArr[0]++;
      } else {
        statsArr[1]++;
      }
    });
    let max = Math.max.apply(Math, statsArr);
    let maxElement = statsArr.indexOf(max);
    if (maxElement === 0) {
      toPrint = "social";
    } else {
      toPrint = "non-social";
    }
    console.log(toPrint);
  };
  proc();

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Layout>
          <Header className="layout-header">my stats</Header>
          <Content>
            Content:
            <Button type="secondary" className="button " onClick={() => {}}>
              completed tasks{" "}
            </Button>
            <Button type="secondary" className="button " onClick={() => {}}>
              non completed tasks{" "}
            </Button>
            <Button type="secondary" className="button " onClick={() => {}}>
              procrastinated tasks{" "}
            </Button>
            {/* {renderCompletedTasks(completedTasks)} */}
          </Content>
        </Layout>
      )}
    </div>
  );
}
