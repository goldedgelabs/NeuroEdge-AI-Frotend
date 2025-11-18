import React, { useContext, useState, useEffect } from "react";
import ThreeDots from "../layout/ThreeDots"; // assumes ThreeDots exists at this path
import SettingsDrawer from "../settings/SettingsDrawer"; // optional (already created earlier)
import InstallPWA from "../layout/InstallPWA"; // optional small component for install prompt
import "../../styles/chatinput.css";

/**
 * TopBar - Premium header with:
 * - Left: NeuroEdge (gold)
 * - Center: Subscription button
 * - Right: Connection status (ThreeDots) and Login / Get Started (hidden when loggedIn)
 *
 * Note: Replace/extend the `loggedIn` state with your auth context.
 */
export default function TopBar({ onSubscribeClick }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // wire to real auth context
  const [username, setUsername] = useState(null);

  // Simulate login detection (replace with actual auth logic)
  useEffect(() => {
    // Example: read from localStorage or context
    const user = null; // replace with real user detection
    if (user) {
      setLoggedIn(true);
      setUsername(user.name || "User");
    }
  }, []);

  const handleLoginClick = () => {
    // Replace with real login flow. For demo, toggle:
    if (!loggedIn) {
      // open login modal or redirect
      // here we simulate login:
      setLoggedIn(true);
      setUsername("Olunde");
    } else {
      // logout
      setLoggedIn(false);
      setUsername(null);
    }
  };

  return (
    <header className="ne-topbar-app">
      <div className="ne-topbar-left">
        <img src="/neuroedge-logo.png" alt="logo" className="ne-top-logo" />
        <div className="ne-brand">
          <span className="ne-name">NeuroEdge</span>
          <span className="ne-pro">Pro</span>
        </div>
      </div>

      <div className="ne-topbar-center">
        <button
          className="subscribe-btn"
          onClick={() => onSubscribeClick?.() || setSettingsOpen(true)}
        >
          <span className="subscribe-label">Upgrade</span>
          <span className="subscribe-badge">Premium</span>
        </button>
      </div>

      <div className="ne-topbar-right">
        <div className="conn-with-login">
          <div className="conn-dot-wrap">
            <ThreeDots />
          </div>

          {!loggedIn ? (
            <button className="login-btn" onClick={handleLoginClick}>
              Get Started / Login
            </button>
          ) : (
            <div className="user-area">
              <div className="user-name">Hi, {username}</div>
            </div>
          )}
        </div>

        <div className="topbar-controls">
          <button
            className="settings-icon"
            onClick={() => setSettingsOpen((s) => !s)}
            title="Settings"
          >
            ⚙️
          </button>

          {/* Optional Install button */}
          <InstallPWA />
        </div>
      </div>

      {/* Settings Drawer (you already have SettingsDrawer component) */}
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </header>
  );
      }
