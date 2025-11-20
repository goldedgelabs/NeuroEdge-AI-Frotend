import React, { useEffect, useState } from "react";
import { useAssets } from "../../context/AssetsContext";

export default function SplashScreen() {
  const { assets } = useAssets();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <img
        src={assets.splash}
        alt="NeuroEdge Splash"
        className="w-32 h-32 animate-pulse"
      />
      <h1 className="mt-4 text-xl font-semibold tracking-wide">
        NeuroEdge
      </h1>
    </div>
  );
    }
