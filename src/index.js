import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Provider store={store}>
    <AppProvider>
      <Router>
        <App/>

      </Router>
    </AppProvider>
      </Provider>
  </React.StrictMode>
);
