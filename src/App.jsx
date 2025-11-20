import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// 🟦 Context Providers
import { UIProvider } from "./context/UIContext";
import { AgentProvider } from "./context/AgentContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AssetsProvider } from "./context/AssetsContext";

// 🟦 Pages / Layout
import AppRoutes from "./routes/AppRoutes";
import SplashScreen from "./components/splash/SplashScreen";
import FloatingChat from "./components/floating/FloatingChat";

// 🟦 Global styles
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <UIProvider>
        <AgentProvider>
          <AssetsProvider>
            <Router>
              {/* Splash screen */}
              <SplashScreen />

              {/* Main App Routes */}
              <AppRoutes />

              {/* Floating Chat (NeuroEdge Assistant) */}
              <FloatingChat />
            </Router>
          </AssetsProvider>
        </AgentProvider>
      </UIProvider>
    </ThemeProvider>
  );
}

export default App;
