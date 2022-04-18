import React from "react";
import App from "./App";
import "./index.scss";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import { BrowserRouter } from "react-router-dom";

import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);
const store = setupStore()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
