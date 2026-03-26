import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { StrictMode } from "react";
import "./style.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </StrictMode>
);