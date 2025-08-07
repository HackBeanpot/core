"use client";

import { useEffect, useState } from "react";

const useCloudEffect = () => {
  const [wasCloudClicked, setCloudEffect] = useState(false);
  const [cloudClicks, setCloudClicks] = useState(0);
  const [isHovering, setHovering] = useState(false);

  const handleCloudClicks = () => {
    if (isHovering) {
      setCloudClicks((prev) => prev + 1);
    } else {
      resetCloudClicks();
    }
  };

  const resetCloudClicks = () => {
    setCloudClicks(0);
  };

  useEffect(() => {
    if (isHovering) {
      if (cloudClicks > 0 && cloudClicks < 5) {
        setCloudEffect(false);
        return;
      }

      if (cloudClicks === 5) {
        setCloudEffect(true);

        const timeout = setInterval(() => {
          setCloudEffect(false);
        }, 1500);

        resetCloudClicks();
        return () => clearTimeout(timeout);
      }
    } else {
      resetCloudClicks();
    }
  }, [isHovering, cloudClicks]);

  return {wasCloudClicked, handleCloudClicks, setHovering};
};

export default useCloudEffect;