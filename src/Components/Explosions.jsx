import { useRef } from "react";
import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const ExplosionEffect = ({
  fadeSpeed = 1,
  growSpeed = 4,
  onComplete,
  shake = 0.075,
  psize = 3,
  position,
}) => {
  const explosionRef = useRef();
  const [ x, y, z ] = position;
  useFrame(({ camera }, delta) => {
    if (!explosionRef.current) return;

    // Camera shake
    camera.position.x += (Math.random() - 0.5) * shake;
    camera.position.y += (Math.random() - 0.5) * shake;

    // Growth
    explosionRef.current.scale.addScalar(growSpeed * delta);

    // Fade
    explosionRef.current.material.opacity -= fadeSpeed * delta;
    explosionRef.current.material.transparent = true;

    if (explosionRef.current.material.opacity <= 0 && onComplete) {
      onComplete();
    }
  });

  return (
    <mesh ref={explosionRef} position={[x, y, z]}>
      <Sparkles count={200} color="yellow" size={psize / 2} speed={1 / 4} />
      <Sparkles count={100} color="gray" size={psize} speed={1 / 4} />
      <sphereGeometry args={[0.15, 60, 60]} />
      <meshStandardMaterial color="black" emissive="gray" opacity={1} />
    </mesh>
  );
};
