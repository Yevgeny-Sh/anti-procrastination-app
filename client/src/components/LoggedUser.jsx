import React from "react";
import { Link } from "react-router-dom";

export default function LoggedUser(props) {
  //console.log(props);
  return (
    <div>
      <div>hello:{props.location.state.currUser.name}</div>
      <div>logout</div>
      <Link to="/tasks" className="home-link ">
        my tasks{"    "}
        <br />
      </Link>
      <Link to="/new-tasks" className="home-link ">
        create new task{"    "}
        <br />
      </Link>
      <div>create new task:</div>
    </div>
  );
}
