import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserEdit from "./components/EditUserDetails";

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/edit" element={<UserEdit/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
