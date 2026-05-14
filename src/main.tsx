import "@fontsource/jetbrains-mono";
import "@fontsource/space-grotesk";
import "./styles/tokens.css";
import "./styles/reset.css";
import "./styles/fx.css";
import "./styles/layout.css";
import "./styles/terminal.css";
import "./styles/sections.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
