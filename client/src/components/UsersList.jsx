import { useState } from "react";
import api from "../api/api";
export default function UsersList() {
  const [users, setUsers] = useState("");

  const getUsersList = async () => {
    const { data } = await api.get("/users");
    setUsers(data);
  };
  const renderUsers = () => {
    const usersList = users.users;
    console.log(usersList);
    const cards = usersList.map((elm) => {
      return <div key={elm._id}>{elm.name}</div>;
    });
    console.log(cards);
    return cards;
  };
  return (
    <div className="App">
      {" "}
      users list:
      <button onClick={getUsersList}>get</button>
      {users ? <div className="userLIst">{renderUsers()}</div> : <div></div>}
    </div>
  );
}
