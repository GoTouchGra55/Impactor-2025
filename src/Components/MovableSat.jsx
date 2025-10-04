import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";

export default function MovSatellite({
  position = [0, 0, 0],
  rotation = [Math.PI, -Math.PI/2, Math.PI],
  scale = 1,
  speed = 1,
  satRef
}) {
  const { scene } = useGLTF("/models/Satellite.glb");
  const [_, getKeys] = useKeyboardControls();

  useFrame((_, delta) => {
    if (!satRef.current) return;

    const keys = getKeys();
    const currentPos = satRef.current.translation(); // physics position
    const nextPos = { ...currentPos };

    // WASD + QE movement
    if (keys.forward) nextPos.z += speed * delta;
    if (keys.backward) nextPos.z -= speed * delta;
    if (keys.left) nextPos.x += speed * delta * 0.5;
    if (keys.right) nextPos.x -= speed * delta * 0.5;
    if (keys.up) nextPos.y += speed * delta * 0.5;
    if (keys.down) nextPos.y -= speed * delta * 0.5;

    // Apply kinematic translation
    satRef.current.setNextKinematicTranslation(nextPos);

    // Optional: spin slowly
    satRef.current.setNextKinematicRotation({
      x: rotation[0],
      y: rotation[1] + delta * 0.2,
      z: rotation[2],
    });
  });

  return (
    <RigidBody
      ref={satRef}
      type="kinematicPosition"
      position={position}
      rotation={rotation}
      gravityScale={0}
      colliders="cuboid"
    >
      <primitive object={scene} scale={scale / 5} />
    </RigidBody>
  );
}

useGLTF.preload("/models/Satellite.glb");
