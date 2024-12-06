import { SpeedInsights } from '@vercel/speed-insights/react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";
import "./styles/global.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="795342462477-gl3m436j2fgop67gc4hfljcd2kte1d7b.apps.googleusercontent.com">
      <App />
      <SpeedInsights />
    </GoogleOAuthProvider>
  </StrictMode>
);
