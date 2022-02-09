import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";

//import api from "../api/api";

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
      // const res = await api.post("/users/logout", {}, requestOptions);
      const res = await axios.post(
        `https://procrastination-app.herokuapp.com/api/users/logout`,
        {},
        requestOptions
      );
      if (res) {
        console.log(`logged out`);
        sessionStorage.removeItem("token");
        history.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>hello:{props.location.state.currUser.name}</div>
      <button className="button logout-btn" onClick={() => handleLogOut()}>
        logout
      </button>
      <Link to="/tasks" className="home-link ">
        my tasks{"    "}
        <br />
      </Link>
      <Link to="/update" className="home-link ">
        update credentials{"    "}
        <br />
      </Link>
      <Link to="/new-tasks" className="home-link ">
        create new task{"    "}
        <br />
      </Link>
    </div>
  );
}
