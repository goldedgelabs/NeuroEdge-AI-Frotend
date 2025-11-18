// src/hooks/useUploadProgress.js

import { useEffect, useState } from "react";

export default function useUploadProgress(active) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [active]);

  return progress;
}
