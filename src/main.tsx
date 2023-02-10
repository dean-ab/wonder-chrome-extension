import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Launcher } from "./WonderApp/Launcher";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Launcher />
  </React.StrictMode>
);
