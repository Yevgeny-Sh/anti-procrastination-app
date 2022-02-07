import React, { useState } from "react";
import api from "../api/api";

export default function CreateTask() {
  //import { Link } from "react-router-dom";
  //import { useHistory } from "react-router-dom";

  //const history = useHistory();

  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("");
  const [owner, setOwner] = useState("");

  //const [name, setName] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  //   const setTokenInStorage = (userToken) => {
  //     sessionStorage.setItem("token", JSON.stringify(userToken));
  //   };
  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const onUrgencyChange = (event) => {
    setUrgency(event.target.value);
  };

  const handleCreate = async () => {
    const task = {
      description,
      urgency,
      owner,
    };
    //  try {
    //   const res = await api.post("/tasks", task);
    //   if (res.data) {
    //setToken(data.token);
    //setTokenInStorage(res.data.token);
    //  let currUser = res.data.user;
    //  let path = `/login/me`;
    //history.push(path);
    // history.push({
    //   pathname: path,
    //   state: { currUser },
    // });
    //  }
    //  } catch (error) {
    //  setErrorMsg(error.response);
    //  }
  };
  return (
    <>
      <input
        value={description}
        placeholder="description"
        onChange={onDescriptionChange}
      />
      <div>urgency: </div>
      <input value={urgency} placeholder="urgency" onChange={onUrgencyChange} />
      <button className="create-btn" onClick={handleCreate}>
        create
      </button>
      {errorMsg ? (
        <div className="errorMsg">error:{errorMsg}</div>
      ) : (
        <div></div>
      )}
    </>
  );
}
//
// return <div>hi</div>;
