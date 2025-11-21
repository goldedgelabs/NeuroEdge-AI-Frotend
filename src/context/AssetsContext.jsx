import { createContext, useContext, useState } from "react";

const AssetsContext = createContext();
export const useAssets = () => useContext(AssetsContext);

export function AssetsProvider({ children }) {
  // Branding assets
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

  // File uploads (for chat)
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Audio recordings
  const [recordings, setRecordings] = useState([]);

  // Update any branding asset
  const updateAsset = (key, value) => {
    setAssets((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AssetsContext.Provider
      value={{
        assets,
        updateAsset,
        uploadedFiles,
        setUploadedFiles,
        recordings,
        setRecordings,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
}
