import "./App.css";

import React from "react";
//import { BrowserRouter, Route, Link } from "react-router-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage";
import UserRegister from "./components/UserRegister";
import UserLogin from "./components/UserLogin";
import UserUpdate from "./components/UserUpdate";
import UsersList from "./components/UsersList";
import LoggedUser from "./components/LoggedUser";

//import NotFound from "./NotFound";
function App() {
  return (
    <div className="app-main-container">
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/register" exact component={UserRegister} />

            <Route path="/login/me" exact component={LoggedUser} />
            <Route path="/login" exact component={UserLogin} />

            <Route path="/update" exact component={UserUpdate} />
            <Route path="/users" exact component={UsersList} />

            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
