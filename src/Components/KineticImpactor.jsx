import { useGLTF, Html } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { ExplosionEffect } from "./Explosions";
import DeflectedCard from "./DeflectedCard";

export default function KineticImpactor({
  position = [0, 0, 0],
  rotation = [Math.PI, -Math.PI / 2, Math.PI],
  scale = 1,
  speed = 1,
  satRef,
  onDeflect,
  failTimeout = 35000, // milliseconds until failure if no deflection
}) {
  const { scene } = useGLTF("/models/Satellite.glb");
  const [_, getKeys] = useKeyboardControls();
  const [move, setMove] = useState(true);
  const [explosion, setExplosion] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [earthCollision, setEarthCollision] = useState(false);
  const [deflected, setDeflected] = useState(false);

  // Timer to trigger fail-safe if asteroid not deflected
  useEffect(() => {
    if (explosion || deflected) return;

    const timer = setTimeout(() => {
      setEarthCollision(true); // asteroid hits Earth
      setShowReturn(true); // show the result UI
    }, failTimeout);

    return () => clearTimeout(timer);
  }, [explosion, deflected, failTimeout]);

  // Movement
  useFrame((_, delta) => {
    if (!satRef.current || !move) return;
    const keys = getKeys();
    const currentPos = satRef.current.translation();
    const nextPos = { ...currentPos };

    nextPos.z += speed * delta;
    if (keys.backward) nextPos.z -= speed * delta * 0.5;
    if (keys.left) nextPos.x += speed * delta * 0.5;
    if (keys.right) nextPos.x -= speed * delta * 0.5;
    if (keys.up) nextPos.y += speed * delta * 0.5;
    if (keys.down) nextPos.y -= speed * delta * 0.5;

    satRef.current.setNextKinematicTranslation(nextPos);
  });

  const handleDeflection = () => {
    setMove(false);
    setExplosion(true);
    setIsDestroyed(true);
    setDeflected(true);
    if (typeof onDeflect === "function") onDeflect();
  };

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
        onCollisionEnter={handleDeflection}
      >
        {!isDestroyed && <primitive object={scene} scale={scale / 5} />}
      </RigidBody>

      {/* Explosion animation */}
      {explosion && (
        <ExplosionEffect
          position={[
            satRef.current.translation().x + 0.35,
            satRef.current.translation().y,
            satRef.current.translation().z,
          ]}
          onComplete={() => {
            setShowReturn(true);
            setExplosion(false);
          }}
        />
      )}

      {/* Result panel */}
      {showReturn && (
        <Html center>
          <div className="flex justify-center items-center w-[160%]">
            {deflected && !earthCollision ? (
              <DeflectedCard />
            ) : (
              <div className="bg-gray-800 px-8 py-5 font-mono text-center text-2xl rounded-2xl text-white shadow-lg">
                <h1 className="font-bold mb-3">Deflection Unsuccessful</h1>
                <h2 className="font-extralight mb-2">Oh No! 😢</h2>
                <h2>The asteroid has struck the Earth 🌎.</h2>
              </div>
            )}
          </div>
        </Html>
      )}
    </>
  );
}

useGLTF.preload("/models/Satellite.glb");
