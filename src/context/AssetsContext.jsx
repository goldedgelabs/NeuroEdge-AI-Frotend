import { createContext, useContext, useState } from "react";

// Create the context
const AssetsContext = createContext();

// Provider component
export const AssetsProvider = ({ children }) => {
  const [assets, setAssets] = useState({
    icons: {},
    images: {},
    logos: {},
  });

  // Function to register assets dynamically
  const registerAsset = (key, value) => {
    setAssets((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...value,
      },
    }));
  };

  return (
    <AssetsContext.Provider value={{ assets, registerAsset }}>
      {children}
    </AssetsContext.Provider>
  );
};

// Hook to use the context elsewhere
export const useAssets = () => useContext(AssetsContext);
