import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export default function SatelliteCam({ satelliteRef }) {
  const controlsRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (!satelliteRef.current) return;

    const pos = satelliteRef.current.translation(); // Rapier RigidBody
    if (!pos) return;

    controlsRef.current.target.set(pos.x, pos.y, pos.z);
    camera.position.lerp({ x: pos.x, y: pos.y + 1/10, z: pos.z - 2/3 }, 1);
    controlsRef.current.update();
  });

  return <OrbitControls ref={controlsRef} enablePan={false} />;
}
