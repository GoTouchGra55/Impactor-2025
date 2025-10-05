import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useKeyboardControls, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import DeflectedCard from "./DeflectedCard";

const GravityTractor = ({
  scale = 1,
  rotation = [Math.PI, -Math.PI / 2, Math.PI],
  satRef,
  meteoriteRef,
  position = [0, 0, 0],
  strength = 2,
  speed = 2,
  followOffset = [0, 0, -2],
  onDeflect, // callback when asteroid is successfully deflected
  deflectionDistance = 1000, // distance at which we consider asteroid deflected
}) => {
  const { scene } = useGLTF("/models/Satellite.glb");
  const [_, getKeys] = useKeyboardControls();

  const [deflected, setDeflected] = useState(false);
  const tempAst = useRef(new THREE.Vector3());
  const tempAdj = useRef(new THREE.Vector3());
  const tempDir = useRef(new THREE.Vector3());
  const offsetVec = useRef(new THREE.Vector3(...followOffset));

  useFrame((_, delta) => {
    if (!satRef?.current || !meteoriteRef?.current || deflected) return;

    // 1. Asteroid position
    tempAst.current.copy(meteoriteRef.current.translation());

    // 2. Keyboard movement
    const keys = getKeys() || {};
    tempAdj.current.set(0, 0, 0);
    if (keys.forward) tempAdj.current.z -= speed * delta;
    if (keys.backward) tempAdj.current.z += speed * delta;
    if (keys.left) tempAdj.current.x -= speed * delta;
    if (keys.right) tempAdj.current.x += speed * delta;
    if (keys.up) tempAdj.current.y += speed * delta;
    if (keys.down) tempAdj.current.y -= speed * delta;

    // 3. Target position
    const targetPos = tempAst.current
      .clone()
      .add(offsetVec.current)
      .add(tempAdj.current);

    // 4. Move satellite
    satRef.current.setNextKinematicTranslation(targetPos);

    // 5. Gravity pull on asteroid
    tempDir.current.subVectors(targetPos, tempAst.current);
    const distance = tempDir.current.length();
    if (distance > 0.01) {
      tempDir.current.normalize();
      const safeDist = Math.max(distance, 0.3);
      const mass = meteoriteRef.current.mass();
      const force = ((strength * mass) / (safeDist * safeDist)) * delta;
      meteoriteRef.current.applyImpulse(
        tempDir.current.clone().multiplyScalar(force)
      );
    }

    // 6. Check for successful deflection
    if (
      tempAst.current.distanceTo(new THREE.Vector3(0, 0, 0)) >
      deflectionDistance
    ) {
      setDeflected(true);
      if (typeof onDeflect === "function") onDeflect();
    }
  });

  return (
    <>
      <RigidBody
        ref={satRef}
        type="kinematicPosition"
        colliders="ball"
        position={position}
        rotation={rotation}
        mass={1}
      >
        {!deflected && <primitive object={scene} scale={scale / 5} />}
      </RigidBody>

      {/* Success panel */}
      {deflected && (
        <Html center>
          <div className="bg-gray-800 px-8 py-5 font-mono text-center text-2xl rounded-2xl text-white shadow-lg">
            <h1 className="font-bold mb-3">Deflection Successful!</h1>
            <h2 className="font-extralight mb-2">Great Job! 🎉</h2>
            <h2>The asteroid has been safely deflected away from Earth 🌎.</h2>
          </div>
        </Html>
      )}
    </>
  );
};

useGLTF.preload("/models/Satellite.glb");

export default GravityTractor;
