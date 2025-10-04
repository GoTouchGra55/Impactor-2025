import { useGLTF } from "@react-three/drei";
import { DiameterContext } from "../Context/DiameterContext";
import { useFrame } from "@react-three/fiber";
import { useContext } from "react";
import { RigidBody } from "@react-three/rapier";

const SimAsteroid = ({ asteroidRef, position = [3, -1, -3] }) => {
  const { scene } = useGLTF("/models/meteorite.glb");
  const diameterKm = useContext(DiameterContext);

  useFrame(() => {
    if (!asteroidRef.current) return;
    
    asteroidRef.current.setAngvel({ x: 0.01, y: 0, z: 0.02 });
  });

  return (
    <RigidBody
      ref={asteroidRef}
      type="dynamic"
      gravityScale={0}
      colliders="hull"
    >
      <primitive
        ref={asteroidRef}
        position={position}
        scale={diameterKm / 10}
        object={scene}
      />
    </RigidBody>
  );
};

useGLTF.preload("/models/meteorite.glb");

export default SimAsteroid;
