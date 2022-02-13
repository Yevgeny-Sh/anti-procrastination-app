import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Button, Spin, Card } from "antd";
import api from "../api/api";
const { Header, Content } = Layout;

export default function UsersStats() {
  const [loading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [popularCompletedCategory, setPopularCompletedCategory] = useState("");
  const [completedStatsArray, setCompletedStatsArray] = useState([]);

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

  const setCompletedTasksStats = () => {
    let statsArr = [0, 0, 0, 0, 0];

    let completedTasks = tasks.filter((task) => task.isCompleted);
    let completedTasksTotal = completedTasks.length;
    console.log(completedTasksTotal);
    completedTasks.forEach((task) => {
      if (task.category === "work") {
        statsArr[0]++;
      } else if (task.category === "academic") {
        statsArr[1]++;
      } else if (task.category === "birocratic") {
        statsArr[2]++;
      } else if (task.category === "social") {
        statsArr[3]++;
      } else if (task.category === "medical") {
        statsArr[4]++;
      }
    });
    console.log(statsArr);
    setCompletedStatsArray(statsArr);
    let max = Math.max.apply(Math, statsArr);
    let maxElementIndex = statsArr.indexOf(max);
    if (tasks) {
      switch (maxElementIndex) {
        case 0:
          setPopularCompletedCategory("work");
          break;
        case 1:
          setPopularCompletedCategory("academic");
          break;
        case 2:
          setPopularCompletedCategory("birocratic");
          break;
        case 3:
          setPopularCompletedCategory("social");
          break;
        case 4:
          setPopularCompletedCategory("medical");
          break;
        default:
          setPopularCompletedCategory("work");
      }
    }
  };

  const renderCompletedTasksStats = () => {
    let taskToRender = (
      <Card className="task-card">
        <p>
          {" "}
          total completed tasks:{completedStatsArray.reduce((a, b) => a + b, 0)}
        </p>
        <p>
          {" "}
          most completed category:
          {popularCompletedCategory}
        </p>
      </Card>
    );
    return taskToRender;
  };

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Layout>
          <Header className="layout-header">my stats</Header>
          <Content>
            Content:
            <Button
              type="secondary"
              className="button "
              onClick={() => {
                setCompletedTasksStats();
              }}
            >
              completed tasks{" "}
            </Button>
            <Button type="secondary" className="button " onClick={() => {}}>
              non completed tasks{" "}
            </Button>
            <Button type="secondary" className="button " onClick={() => {}}>
              procrastinated tasks{" "}
            </Button>
            {popularCompletedCategory ? renderCompletedTasksStats() : "..."}
          </Content>
        </Layout>
      )}
    </div>
  );
}
