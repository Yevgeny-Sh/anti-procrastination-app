import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Layout } from "antd";
import { Button, Card } from "antd";
import api from "../api/api";
const { Header, Content } = Layout;

export default function LoggedUser(props) {
  const history = useHistory();

  const handleLogOut = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log(token);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await api.post("/users/logout", {}, requestOptions);
      if (res) {
        console.log(`logged out`);
        sessionStorage.removeItem("token");
        history.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await api.delete("/users/me", requestOptions);
      if (res) {
        console.log(`account deleted`);
        sessionStorage.removeItem("token");
        history.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Header>
        Header
        <Button
          type="secondary"
          className="button logout-btn"
          onClick={() => handleLogOut()}
        >
          Logout
        </Button>
        <Button>
          <Link to="/update" className="home-link ">
            update credentials{"    "}
            <br />
          </Link>
        </Button>
        <Button
          type="secondary"
          className="button logout-btn"
          onClick={() => handleDeleteAccount()}
        >
          Delete account
        </Button>
      </Header>
      <Content>
        {" "}
        <Card>
          <div>Hello:{props.location.state.currUser.name}</div>

          <br />
          <Link to="/tasks" className="home-link ">
            My tasks{"    "}
            <br />
          </Link>

          <Link to="/new-tasks" className="home-link ">
            Create new task{"    "}
            <br />
          </Link>
          <Link to="/my-completed" className="home-link ">
            Completed tasks{"    "}
            <br />
          </Link>
          <Link to="/my-procrastinated" className="home-link ">
            Procrastinated task{"    "}
            <br />
          </Link>
          <Link to="/my-stats" className="home-link ">
            my stats{"    "}
            <br />
          </Link>
        </Card>
      </Content>
    </Layout>
  );
}
