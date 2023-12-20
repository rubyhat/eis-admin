import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/global.scss";
import { App } from "./modules/AppModule";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
