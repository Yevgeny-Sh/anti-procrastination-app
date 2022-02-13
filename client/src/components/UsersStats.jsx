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

  const [popularProcCategory, setPopularProcCategory] = useState("");
  const [procStatsArray, setProcStatsArray] = useState([]);

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
    let statsToRender = (
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
        {/* <p>
          {" "}
          most popular procrstination reason In completed tasks:
          {"bordom"}
        </p> */}
        <p>
          {" "}
          number of work tasks completed:
          {completedStatsArray[0]}
        </p>
        <p>
          {" "}
          number of academic tasks completed:
          {completedStatsArray[1]}
        </p>
        <p>
          {" "}
          number of birocratic tasks completed:
          {completedStatsArray[2]}
        </p>
        <p>
          {" "}
          number of social tasks completed:
          {completedStatsArray[3]}
        </p>
        <p>
          {" "}
          number of medical tasks completed:
          {completedStatsArray[4]}
        </p>
      </Card>
    );
    return statsToRender;
  };

  const setProcTasksStats = () => {
    let statsArr = [0, 0, 0, 0, 0];

    let procTasks = tasks.filter((task) => {
      return Date.parse(task.dueDate) <= Date.now() && !task.isCompleted;
    });
    let procTasksTotal = procTasks.length;
    console.log(procTasksTotal);
    procTasks.forEach((task) => {
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
    setProcStatsArray(statsArr);
    let max = Math.max.apply(Math, statsArr);
    let maxElementIndex = statsArr.indexOf(max);
    if (tasks) {
      switch (maxElementIndex) {
        case 0:
          setPopularProcCategory("work");
          break;
        case 1:
          setPopularProcCategory("academic");
          break;
        case 2:
          setPopularProcCategory("birocratic");
          break;
        case 3:
          setPopularProcCategory("social");
          break;
        case 4:
          setPopularProcCategory("medical");
          break;
        default:
          setPopularProcCategory("work");
      }
    }
  };

  const renderProcTasksStats = () => {
    let statsToRender = (
      <Card className="task-card">
        <p>
          {" "}
          total procrastinated tasks:
          {procStatsArray.reduce((a, b) => a + b, 0)}
        </p>
        <p>
          {" "}
          most procrastinated category:
          {popularProcCategory}
        </p>
        {/* <p>
          {" "}
          most popular procrstination reason:
          {"bordom"}
        </p> */}
        <p>
          {" "}
          number of work tasks procrastinated:
          {procStatsArray[0]}
        </p>
        <p>
          {" "}
          number of academic tasks procrastinated:
          {procStatsArray[1]}
        </p>
        <p>
          {" "}
          number of birocratic tasks procrastinated:
          {procStatsArray[2]}
        </p>
        <p>
          {" "}
          number of social tasks procrastinated:
          {procStatsArray[3]}
        </p>
        <p>
          {" "}
          number of medical tasks procrastinated:
          {procStatsArray[4]}
        </p>
      </Card>
    );
    return statsToRender;
  };

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Layout>
          <Header className="layout-header">my stats</Header>
          <Content>
            <Button
              type="secondary"
              className="button "
              onClick={() => {
                setCompletedTasksStats();
              }}
            >
              completed tasks{" "}
            </Button>
            <Button
              type="secondary"
              className="button "
              onClick={() => {
                setProcTasksStats();
              }}
            >
              procrastinated tasks{" "}
            </Button>
            <div>
              {popularCompletedCategory ? renderCompletedTasksStats() : <div />}
            </div>
            <div>{popularProcCategory ? renderProcTasksStats() : <div />}</div>
          </Content>
        </Layout>
      )}
    </div>
  );
}
