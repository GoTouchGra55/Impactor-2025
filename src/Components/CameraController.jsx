import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export default function SatelliteCam({ satelliteRef, asteroidDeflected }) {
  const controlsRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (!controlsRef.current) return;

    if (!asteroidDeflected && satelliteRef.current) {
      const pos = satelliteRef.current.translation();
      controlsRef.current.target.set(pos.x, pos.y, pos.z);
      camera.position.lerp({ x: pos.x, y: pos.y + 0.1, z: pos.z - 0.66 }, 0.25);
    } else {
      // Smoothly return to overview
      camera.position.lerp({ x: 0, y: 10, z: 15 }, 0.02);
      controlsRef.current.target.lerp({ x: 0, y: 0, z: 0 }, 0.02);
    }

    controlsRef.current.update();
  });

  return <OrbitControls ref={controlsRef} enablePan={false} />;
}
