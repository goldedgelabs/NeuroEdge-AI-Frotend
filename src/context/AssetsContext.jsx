import React, { createContext, useContext, useState } from "react";

const AssetsContext = createContext();
export const useAssets = () => useContext(AssetsContext);

export const AssetsProvider = ({ children }) => {
  const [assets, setAssets] = useState({
    logo: "/assets/logo.png",
    splash: "/assets/splash.png",
    icon: "/assets/icon.png",
    founder: {
      name: "Joseph Were",
      email: "josephogwe8@gmail.com",
      phone: "+254712562780",
    },
  });

  const updateAsset = (key, value) => {
    setAssets((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AssetsContext.Provider value={{ assets, updateAsset }}>
      {children}
    </AssetsContext.Provider>
  );
};
