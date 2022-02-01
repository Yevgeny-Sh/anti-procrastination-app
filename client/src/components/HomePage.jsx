import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="home-header">no more rocrastination</div>
      <Link to="/register" className="home-link ">
        register{"    "}
        <br />
      </Link>
      <Link to="/login" className="home-link ">
        login
      </Link>
      <br />
      <Link to="/users" className="home-link">
        get user list
      </Link>
    </div>
  );
}
