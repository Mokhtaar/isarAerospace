"use client";

import { Canvas } from "@react-three/fiber";
import Stars from "./components/Stars";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="flex h-screen flex-row items-center justify-between">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        style={{
          // position: "fixed",
          width: "100%",
          backgroundColor: "#081529",
          height: "100%",
        }}
      >
        <Stars />
      </Canvas>
    </main>
  );
}
