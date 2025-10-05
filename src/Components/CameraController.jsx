import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function SatelliteCam({
  satelliteRef,
  mode = "Kinetic Impactor",
}) {
  const controlsRef = useRef();
  const { camera } = useThree();

  const tempCamPos = new THREE.Vector3();
  const tempTarget = new THREE.Vector3();

  // Define once, then update in useFrame
  const cameraOffset = new THREE.Vector3();

  useFrame(() => {
    if (!controlsRef.current || !satelliteRef?.current) return;

    // Set camera offset based on mode
    if (mode === "Gravity Tractor") {
      cameraOffset.set(0, 0.5, -3);
    } else {
      cameraOffset.set(0, 0.2, -1);
    }

    const pos = satelliteRef.current.translation();

    // Target satellite
    tempTarget.copy(pos);
    controlsRef.current.target.lerp(tempTarget, 0.25);

    // Camera offset from satellite
    tempCamPos.copy(pos).add(cameraOffset);
    camera.position.lerp(tempCamPos, 0.25);

    controlsRef.current.update();
  });

  return <OrbitControls ref={controlsRef} />;
}
