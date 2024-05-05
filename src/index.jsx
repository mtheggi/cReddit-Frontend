import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Client_ID, NODE_ENV } from "./constants.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserContextProvider } from "./context/UserContext.jsx";
import { ServerContextProvider } from "./context/ServerContext.jsx";
import { NavbarContextProvider } from "./context/NavbarContext.jsx";
import { StrictMode } from "react";
import { NotificationProvider } from "./Components/notifications/NotificationContext";
import { SidebarContextProvider } from "./context/SidebarContext.jsx";

axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

async function enableMocking() {
  if (NODE_ENV !== "development") {
    return;
  }
  const { worker } = await import("./mocks/browser");
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={Client_ID}>
      <NavbarContextProvider>
        <NotificationProvider>
          <ServerContextProvider>
            <UserContextProvider>
              <SidebarContextProvider>
                <App />
              </SidebarContextProvider>
            </UserContextProvider>
          </ServerContextProvider>
        </NotificationProvider>
      </NavbarContextProvider>
    </GoogleOAuthProvider>
  );
});
