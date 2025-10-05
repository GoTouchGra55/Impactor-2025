import { Line, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useContext, useEffect, useState } from "react";
import { DiameterContext } from "../Context/DiameterContext";

const Meteorite = ({ targetPos = { x: -110, y: 0, z: -1010 }, meteoriteRef }) => {
  const { scene } = useGLTF("/models/meteorite.glb");
  const diameterKm = useContext(DiameterContext);
  const [points, setPoints] = useState([
    [0, 0, 0],
    [targetPos.x, targetPos.y, targetPos.z],
  ]);

  // Apply a one-time impulse when the physics body is ready
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (meteoriteRef?.current) {
        meteoriteRef.current.applyImpulse({ x: -2, y: 0, z: -20 }, true);
        console.log("Impulse applied after delay!");
      }
    }, 100); // wait 100ms for Rapier to initialize

    return () => clearTimeout(timeout);
  }, []);

  useFrame(() => {
    if (!meteoriteRef.current) return;

    // Continuous rotation
    meteoriteRef.current.setAngvel({ x: 0.01, y: 0.3, z: 0.2 }, true);
    
    // Update line points
    const pos = meteoriteRef.current.translation();
    setPoints([
      [pos.x, pos.y, pos.z],
      [targetPos.x, targetPos.y, targetPos.z],
    ]);
  });

  return (
    <>
      <RigidBody
        ref={meteoriteRef}
        colliders="hull"
        position={[0, 0, 0]}
        type="dynamic"
        gravityScale={0}
        mass={9999999}
      >
        <primitive scale={diameterKm / 5} object={scene} />
      </RigidBody>

      <Line points={points} color="white" lineWidth={1} />
    </>
  );
};

useGLTF.preload("/models/meteorite.glb");

export default Meteorite;
