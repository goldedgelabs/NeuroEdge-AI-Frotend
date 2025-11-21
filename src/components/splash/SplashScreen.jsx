import React, { useEffect } from "react";
import { useUI } from "../../context/UIContext";
import { useAssets } from "../../context/AssetsContext";

export default function SplashScreen() {
  const { showSplash, setShowSplash } = useUI();
  const { assets } = useAssets();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, [setShowSplash]);

  if (!showSplash) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white animate-fadeOut">
      <img
        src={assets.splash}
        alt="NeuroEdge Splash"
        className="w-32 h-32 animate-pulse"
      />
      <h1 className="mt-4 text-2xl font-semibold tracking-wide">
        NeuroEdge
      </h1>
    </div>
  );
}
