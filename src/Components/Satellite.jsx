import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Satellite = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) => {
  const { scene } = useGLTF("/models/Satellite.glb");

  return (
    <RigidBody position={position} rotation={rotation} type="dynamic" gravityScale={0}>
      <primitive object={scene} scale={scale/5} />
    </RigidBody>
  );
};

useGLTF.preload("/models/Satellite.glb");

export default Satellite;
