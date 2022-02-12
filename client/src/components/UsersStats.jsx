// import React, { useState, useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { Layout } from "antd";
// import { Button, Card, Spin } from "antd";
// import api from "../api/api";
// const { Header, Content } = Layout;

import React from "react";

export default function UsersStats() {
  //   const [tasks, setTasks] = useState([]);
  //   const [loading, setIsLoading] = useState(true);
  //   const [completedTasks, setCompletedTasks] = useState({
  //     overAllNum: 0,
  //     work: 0,
  //     academic: 0,
  //     birocratic: 0,
  //     social: 0,
  //     medical: 0,
  //   });

  //   const getTasks = async () => {
  //     const token = JSON.parse(sessionStorage.getItem("token"));

  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     try {
  //       const res = await api.get("/tasks", requestOptions);
  //       if (res.data) {
  //         setIsLoading(false);
  //         setTasks(res.data);
  //       }
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   };
  //   useEffect(() => {
  //     getTasks();
  //     countCompletedTasks();
  //   }, []);

  //   const renderCompletedTasks = (completedTasks) => {
  //     let nonCompletedTasks = "";
  //     if (completedTasks) {
  //       const renderedResults = completedTasks.map((task) => {
  //         let aasks = (
  //           <Card className="task-card" key={task._id}>
  //             <p> overAllNum:{task.overAllNum}</p>
  //             {/* <p> category:{task.category}</p>
  //             <p> importance:{task.importance}</p>
  //             <p> urgency:{task.urgency}</p>
  //             <p> willingness:{task.willingness}</p>
  //             <p> task created at:{task.createdAt.slice(0, -14)}</p>
  //             <p> task due at :{task.dueDate.slice(0, -14)}</p> */}
  //           </Card>
  //         );

  //         return aasks;
  //       });
  //       return renderedResults;
  //     }
  //   };

  //   const countCompletedTasks = () => {
  //     let obj = {
  //       overAllNum: 0,
  //       work: 0,
  //       academic: 0,
  //       birocratic: 0,
  //       social: 0,
  //       medical: 0,
  //     };
  //     let completedTasks = tasks.map((task) => {
  //       if (task.isCompleted === true) {
  //         obj.overAllNum++;
  //       }
  //       return obj;
  //     });
  //     setCompletedTasks(obj);
  //     console.log(obj);
  //   };

  return (
    <div>
      {/* {loading ? (
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
            {renderCompletedTasks(completedTasks)}
          </Content>
        </Layout>
      )} */}
    </div>
  );
}
