"use client";
import { useEffect, useRef, useState } from "react";
import ThreeScene from "../components/ThreeScene";
import VelocityGauge from "../components/VelocityGauge";
import Logo from "../components/Logo";
import ToggleButton from "../components/Switch";
import Altitude from "../components/Altimeter";
import { SpectrumLiveStatus } from "@/types";
import TemperatureGauge from "../components/TemperatureGauge";
import { motion } from "framer-motion";

export default function Home() {
  const [data, setData] = useState<SpectrumLiveStatus>({
    Altitude: 0,
    IsActionRequired: false,
    IsAscending: false,
    StatusMessage: "",
    Temperature: 0,
    Velocity: 0,
  });
  const alarmSound = useRef<HTMLAudioElement>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  useEffect(() => {
    isSoundEnabled &&
      data.IsActionRequired &&
      alarmSound.current &&
      alarmSound.current.play();

    alarmSound.current &&
      (!data.IsActionRequired || !isSoundEnabled) &&
      alarmSound.current.pause();
  }, [data.IsActionRequired, isSoundEnabled]);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS"
    );
    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setData(data);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <ThreeScene data={data} />
      <audio loop ref={alarmSound} src="/alarm.mp3">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <main className="text-white">
        <Logo />
        <div className="absolute top-5 right-5">
          <ToggleButton
            isSoundEnabled={isSoundEnabled}
            setIsSoundEnabled={setIsSoundEnabled}
          />
        </div>
        <div className="w-full absolute bottom-2 px-20">
          <div className="h-48 relative flex items-center justify-center border-t">
            <div className="h-full w-full items-center flex flex-col justify-between">
              <VelocityGauge value={data.Velocity} />
              <p className="text-center border-t-2">
                Velocity: {data.Velocity.toFixed(4)}
              </p>
            </div>
            <hr className="bg-white h-[1px] text-white w-96 rotate-90"></hr>
            <div className="h-full w-full items-center flex flex-col justify-between">
              <Altitude value={data.Altitude} />
              <p className="text-center border-t-2">
                Altitude: {data.Altitude.toFixed(4)}
              </p>
            </div>
            <hr className="bg-white h-[1px] text-white w-96 rotate-90"></hr>
            <div className="h-full w-full items-center relative flex flex-col justify-between">
              <TemperatureGauge value={data.Temperature} />
              <p className="text-center border-t-2">
                Temprature: {data.Temperature.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
