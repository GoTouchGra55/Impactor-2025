import { useGLTF } from "@react-three/drei";
import { DiameterContext } from "../Context/DiameterContext";
import { useFrame } from "@react-three/fiber";
import { useRef, useContext } from "react";

const Asteroid = () => {
  const { scene } = useGLTF("/models/meteorite.glb");
  const diameterKm = useContext(DiameterContext);
  const asteroidRef = useRef();

  useFrame(() => {
    if (!asteroidRef.current) return;
    asteroidRef.current.rotation.y += 0.01;
    asteroidRef.current.rotation.x += 0.005;
  });

  return (
    <primitive
      ref={asteroidRef}
      position={[3, -1, -3]}
      scale={diameterKm * 1.5}
      object={scene}
    />
  );
};

useGLTF.preload("/models/meteorite.glb");

export default Asteroid;
