import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

export const Common = () => {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={1.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
    </Suspense>
  );
};
