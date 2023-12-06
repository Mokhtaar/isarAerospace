"use client";

import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { Mesh } from "three";
import { Points, PointMaterial } from "@react-three/drei";
import { random } from "maath";

export default function Stars(props: any) {
  const ref = useRef<Mesh>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );
  useFrame((state, delta) => {
    if (!ref.current) {
      return;
    }
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <>
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points
          ref={ref}
          positions={sphere}
          stride={3}
          frustumCulled={false}
          {...props}
        >
          <PointMaterial
            transparent
            color="white"
            size={0.004}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </group>
    </>
  );
}
