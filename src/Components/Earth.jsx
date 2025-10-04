import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const Earth = () => {
  const { scene } = useGLTF("/models/Earth.glb");

  const earthRef = useRef(); // the Earth mesh
  const tiltRef = useRef();  // the group representing the tilted axis

  const axialTilt = 23.5 * (Math.PI / 180); // 23.5° in radians
  const rotationSpeed = 0.2; // adjust as needed

  useFrame((state, delta) => {
    if (!earthRef.current || !tiltRef.current) return;

    // Rotate around the tilted axis using quaternions
    const axis = new THREE.Vector3(0, 1, 0); // spin axis in local group space
    const q = new THREE.Quaternion();
    q.setFromAxisAngle(axis, rotationSpeed * delta);
    earthRef.current.quaternion.multiply(q);
  });

  return (
    <RigidBody type="fixed" colliders="ball" gravityScale={0}>
      <group ref={tiltRef} rotation={[axialTilt, 0, 0]}>
        <primitive ref={earthRef} scale={1} object={scene} />
      </group>
    </RigidBody>
  );
};

useGLTF.preload("/models/Earth.glb");
export default Earth;
