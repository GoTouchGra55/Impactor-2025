import { Line, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useContext, useRef } from "react";
import { DiameterContext } from "../Context/DiameterContext";

const Meteorite = ({ targetPos = [-100, 0, -1000] }) => {
  const { scene } = useGLTF("/models/meteorite.glb");
  const meteoriteRef = useRef();
  const diameterKm = useContext(DiameterContext);
  const meteorPos = meteoriteRef.current?.translation() || { x: 0, y: 0, z: 0 };
  const points = [[meteorPos.x, meteorPos.y, meteorPos.z], targetPos];

  useFrame(() => {
    if (!meteoriteRef.current) return;
    meteoriteRef.current.setAngvel({ x: 0.01, y: 0.3, z: 0.2 }, true);
  });

  return (
    <>
      <RigidBody ref={meteoriteRef} colliders="hull" position={[0, 0, 0]} type="dynamic" gravityScale={0}>
        <primitive scale={diameterKm} object={scene} />
      </RigidBody>

      <Line points={points} color="white" lineWidth={1} />
    </>
  );
};

useGLTF.preload("/models/meteorite.glb");

export default Meteorite;
