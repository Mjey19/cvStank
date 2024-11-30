import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.scss";
import { App } from "./pages/App/App";
import { Provider } from "react-redux";
import { store } from "./shared/store";
const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

container.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
