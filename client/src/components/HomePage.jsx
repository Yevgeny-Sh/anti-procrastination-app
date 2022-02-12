import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
const { Header, Content } = Layout;
export default function HomePage() {
  return (
    <Layout>
      <Header className="layout-header" theme="dark">
        no more procrastination
      </Header>
      <Content>
        {" "}
        <div className="home-container">
          <Link to="/register" className="home-link ">
            register{"    "}
            <br />
          </Link>
          <Link to="/login" className="home-link ">
            login
          </Link>
          <br />
          {/* <Link to="/users" className="home-link">
        get user list
      </Link>
      <br />
      <Link to="/update" className="home-link">
        update user
      </Link> */}
        </div>
      </Content>
    </Layout>
  );
}
