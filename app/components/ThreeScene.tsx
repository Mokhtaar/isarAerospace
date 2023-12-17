import React from "react";
import { Rocket } from "./Rocket";
import { Canvas } from "@react-three/fiber";
import Stars from "./Stars";
import { PerspectiveCamera } from "three";
import { Html, OrbitControls } from "@react-three/drei";
import { SpectrumProps } from "@/types";

function CameraHelper() {
  const camera = new PerspectiveCamera(50, 1);
  return (
    <group position={[0, 0.6, 1.25]}>
      <cameraHelper args={[camera]} />
    </group>
  );
}

const ThreeScene = ({ data }: { data: SpectrumProps }) => {
  return (
    <Canvas
      camera={{ position: [0, 0.7, 1.7], fov: 50 }}
      className="w-full h-full bg-[#081529]"
      style={{
        position: "fixed",
      }}
    >
      <Stars />
      <OrbitControls
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
        enableZoom={true}
      />
      <Rocket data={data} />
      <Html
        occlude
        distanceFactor={1.5}
        position={[0.1, 0.35, 0]}
        className="px-3 py-2 font-mono text-xs rounded-lg text-white whitespace-nowrap bg-transparent"
      >
        {("statusMessage" in data
          ? data.statusMessage
          : data.StatusMessage
        ).toString()}
      </Html>
      <Html
        occlude
        distanceFactor={1.5}
        position={[0.1, 0.2, 0]}
        className="px-3 py-2 font-mono text-xs rounded-lg  text-white whitespace-nowrap bg-transparent"
      >
        {"isAscending" in data
          ? data.isAscending
            ? "Spectrum is ascending"
            : "Spectrum is descending"
          : data.IsAscending
          ? "Spectrum is ascending"
          : "Spectrum is descending"}
      </Html>
      {/* <CameraHelper /> */}
    </Canvas>
  );
};

export default ThreeScene;
