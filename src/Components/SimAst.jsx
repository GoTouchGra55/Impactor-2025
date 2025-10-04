import { useGLTF } from "@react-three/drei";
import { DiameterContext } from "../Context/DiameterContext";
import { useFrame } from "@react-three/fiber";
import { useContext, useRef } from "react";
import { RigidBody } from "@react-three/rapier";

const SimAsteroid = ({ position = [3, -4, -3] }) => {
  const { scene } = useGLTF("/models/meteorite.glb");
  const diameterKm = useContext(DiameterContext);
  const asteroidRef = useRef();

  useFrame(() => {
    if (!asteroidRef.current) return;

    asteroidRef.current.setAngvel({ x: 0.1, y: 0, z: 0.2 }, true);
  });

  return (
    <RigidBody
      ref={asteroidRef}
      type="dynamic"
      gravityScale={0}
      colliders="hull"
    >
      <primitive position={position} scale={diameterKm / 5} object={scene} />
    </RigidBody>
  );
};

useGLTF.preload("/models/meteorite.glb");

export default SimAsteroid;
