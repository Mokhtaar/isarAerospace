"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ThreeScene from "./components/ThreeScene";
import VelocityGauge from "./components/VelocityGauge";
import ToggleButton from "./components/Switch";
import UpdateTimeCounter from "./components/UpdateTimeCounter";
import Logo from "./components/Logo";
import Altitude from "./components/Altimeter";
import { SpectrumStatus } from "@/types";
import TemperatureGauge from "./components/TemperatureGauge";

export default function Home() {
  const [data, setData] = useState<SpectrumStatus>({
    altitude: 0,
    isActionRequired: false,
    isAscending: false,
    statusMessage: "",
    temperature: 0,
    velocity: 0,
  });
  const alarmSound = useRef<HTMLAudioElement>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus"
      );
      setLastUpdateTime(Date.now());
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isSoundEnabled &&
      data.isActionRequired &&
      alarmSound.current &&
      alarmSound.current.play();

    alarmSound.current &&
      (!data.isActionRequired || !isSoundEnabled) &&
      alarmSound.current.pause();
  }, [data.isActionRequired, isSoundEnabled]);

  useEffect(() => {
    getData();
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
              <VelocityGauge value={data.velocity} />
              <p className="text-center border-t-2">
                Velocity: {data.velocity.toFixed(4)}
              </p>
            </div>
            <hr className="bg-white h-[1px] text-white w-96 rotate-90"></hr>
            <div className="h-full w-full items-center flex flex-col justify-between">
              <Altitude value={data.altitude} />
              <p className="text-center border-t-2">
                Altitude: {data.altitude.toFixed(4)}
              </p>
            </div>
            <hr className="bg-white h-[1px] text-white w-96 rotate-90"></hr>
            <div className="h-full w-full items-center relative flex flex-col justify-between">
              <TemperatureGauge value={data.temperature} />
              <p className="text-center border-t-2">
                Temprature: {data.temperature.toFixed(4)}
              </p>
            </div>

            <div className="border-l">
              <button
                type="button"
                onClick={() => getData()}
                className="rounded-md ml-4 mb-2 divide-none bg-transparent whitespace-nowrap px-3 py-2 text-base font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 "
              >
                Update data
              </button>
              <UpdateTimeCounter lastUpdateTime={lastUpdateTime} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
