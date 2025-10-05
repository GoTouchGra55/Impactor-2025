import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useGLTF, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

const Earth = ({ position = [0, 0, 0], scale = 1 }) => {
  const { scene } = useGLTF("/models/Earth.glb");
  const earthRef = useRef();
  const tiltRef = useRef();
  const [collision, setCollision] = useState(false);
  const axialTilt = 23.5 * (Math.PI / 180);
  const rotationSpeed = 0.2;

  useFrame((_, delta) => {
    if (!earthRef.current || !tiltRef.current) return;
    const axis = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion();
    q.setFromAxisAngle(axis, rotationSpeed * delta);
    earthRef.current.quaternion.multiply(q);
  });

  return (
    <>
      <RigidBody
        position={position}
        type="dynamic"
        colliders="ball"
        gravityScale={0}
        linearDamping={1e9}
        angularDamping={1e19}
        onCollisionEnter={() => setCollision(true)}
        mass={6e24}
      >
        <group ref={tiltRef} rotation={[axialTilt, 0, 0]}>
          <primitive ref={earthRef} scale={scale} object={scene} />
        </group>
      </RigidBody>

      {collision && (
        <Html center>
          <div className="bg-gray-800 px-8 py-5 font-mono text-center text-2xl rounded-2xl text-white shadow-lg">
            <h1 className="font-bold mb-3">Deflection Unsuccessful</h1>
            <h2 className="font-extralight mb-2">Oh No! 😢</h2>
            <h2>The asteroid has struck the Earth 🌎.</h2>
          </div>
        </Html>
      )}
    </>
  );
};

useGLTF.preload("/models/Earth.glb");
export default Earth;
