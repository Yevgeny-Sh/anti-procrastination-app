import React from "react";

export default function LoggedUser(props) {
  console.log(props);
  return (
    <div>
      <div>hello:{props.location.state.currUser.name}</div>
      <div>logout</div>
      <div>my tasks:</div>
      <div>create new task:</div>
    </div>
  );
}
