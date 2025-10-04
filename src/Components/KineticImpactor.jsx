import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useState } from "react";
import { ExplosionEffect } from "./Explosions";

export default function KineticImpactor({
  position = [0, 0, 0],
  rotation = [Math.PI, -Math.PI / 2, Math.PI],
  scale = 1,
  speed = 1,
  satRef,
  onDeflect,
}) {
  const { scene } = useGLTF("/models/Satellite.glb");
  const [_, getKeys] = useKeyboardControls();
  const [move, setMove] = useState(true);
  const [explosion, setExplosion] = useState(false);

  useFrame((_, delta) => {
    if (!satRef.current || !move) return;

    const keys = getKeys();
    const currentPos = satRef.current.translation();
    const nextPos = { ...currentPos };

    nextPos.z += speed * delta;
    if (keys.backward) nextPos.z += speed * delta * 0.5;
    if (keys.left) nextPos.x += speed * delta * 0.8;
    if (keys.right) nextPos.x -= speed * delta * 0.8;
    if (keys.up) nextPos.y += speed * delta * 0.8;
    if (keys.down) nextPos.y -= speed * delta * 0.8;

    satRef.current.setNextKinematicTranslation(nextPos);
  });

  return (
    <>
      <RigidBody
        ref={satRef}
        type="kinematicPosition"
        position={position}
        rotation={rotation}
        gravityScale={0}
        colliders="hull"
        mass={100}
        onCollisionEnter={() => {
          setMove(false);
          setExplosion(true);

          if (typeof onDeflect === "function") onDeflect();
        }}
      >
        <primitive object={scene} scale={scale / 5} />
      </RigidBody>

      {explosion && (
        <ExplosionEffect
          position={[
            satRef.current.translation().x + 0.35,
            satRef.current.translation().y,
            satRef.current.translation().z,
          ]}
          onComplete={() => {
            setExplosion(false);
            alert("Asteroid Deflected Successfully!");
          }}
        />
      )}
    </>
  );
}

useGLTF.preload("/models/Satellite.glb");
