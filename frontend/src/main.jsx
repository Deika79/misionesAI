import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import Player from "./Player.jsx";

const path = window.location.pathname;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {path.startsWith("/play/") ? <Player /> : <App />}
  </StrictMode>
);