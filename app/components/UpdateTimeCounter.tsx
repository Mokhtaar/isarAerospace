import React, { useEffect, useState } from "react";

const UpdateTimeCounter = ({ lastUpdateTime }: { lastUpdateTime: number }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  const formatTime = () => {
    const seconds = elapsedTime % 60;
    const minutes = Math.floor(elapsedTime / 60);
    const formattedMinutes = minutes > 0 ? `${minutes}m:` : "";

    return `${formattedMinutes}${seconds}s`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (lastUpdateTime) {
        const secondsAgo = Math.floor((Date.now() - lastUpdateTime) / 1000);
        setElapsedTime(secondsAgo);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [lastUpdateTime]);

  return <p className="text-sm ml-4 whitespace-nowrap">Last updated {formatTime()}</p>;
};

export default UpdateTimeCounter;
