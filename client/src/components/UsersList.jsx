// import { useState } from 'react';
// import api from './api/api';
//   const getReq = async () => {
//     const { data } = await api.get('/users');
//     console.log(data);
//   };
//   return (
//     <div className='App'>
//       {' '}
//       Hello World!
//       <button onClick={getReq}>get</button>
//     </div>
//   );
// }

import React from "react";
import api from "../api/api";
export default function UsersList() {
  const getUsersList = async () => {
    const { data } = await api.get("/users");
    console.log(data);
  };
  return (
    <div className="App">
      {" "}
      users list:
      <button onClick={getUsersList}>get</button>
    </div>
  );
}
