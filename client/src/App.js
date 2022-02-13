import "./App.css";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage";
import UserRegister from "./components/UserRegister";
import UserLogin from "./components/UserLogin";
import UserUpdate from "./components/UserUpdate";
import UsersList from "./components/UsersList";
import LoggedUser from "./components/LoggedUser";
import UsersTasks from "./components/UsersTasks";
import CreateTask from "./components/CreateTask";
import UsersStats from "./components/UsersStats";
import CompletedTasks from "./components/CompletedTasks";
import ProcrastinatedTasks from "./components/ProcrastinatedTasks";

//import NotFound from "./NotFound";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/register" exact component={UserRegister} />
            <Route path="/login" exact component={UserLogin} />

            <Route path="/log" exact component={LoggedUser} />
            <Route path="/update" exact component={UserUpdate} />
            <Route path="/users" exact component={UsersList} />
            <Route path="/tasks" exact component={UsersTasks} />
            <Route path="/new-tasks" exact component={CreateTask} />
            <Route path="/my-stats" exact component={UsersStats} />
            <Route path="/my-completed" exact component={CompletedTasks} />
            <Route
              path="/my-procrastinated"
              exact
              component={ProcrastinatedTasks}
            />

            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
