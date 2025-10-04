import { useGLTF, Line } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useContext } from "react";
import { DiameterContext } from "../Context/DiameterContext";
import { SpeedContext } from "../Context/SpeedContext";

// Generate a curved orbit ending at the target position
const generateOrbit = (target = [0, 0, 0], steps = 1000) => {
  const points = [];
  const [tx, ty, tz] = target;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = 10 * (1 - t) + tx * t;
    const y = 25 * Math.sin(Math.PI * t) + ty * 2 * t;
    const z = 1 * (1 - t) + tz * t;
    points.push([x, y, z]);
  }
  return points;
};

export default function Meteorite({ target = [0, 0, 0], meteoriteRef }) {
  const { scene } = useGLTF("/models/meteorite.glb");
  const diameterKm = useContext(DiameterContext);
  const speed = useContext(SpeedContext) || 1;
  const orbitPoints = useMemo(() => generateOrbit(target), [target]);
  const positionRef = useRef(0);

  useFrame(() => {
    if (!meteoriteRef?.current) return;

    const pos = positionRef.current;

    // Stop at last point (Earth position)
    if (pos >= orbitPoints.length - 1) return;

    const i = Math.floor(pos);
    const nextI = Math.min(i + 1, orbitPoints.length - 1);
    const t = pos - i;

    // Interpolate between current and next orbit point
    const point = [
      orbitPoints[i][0] * (1 - t) + orbitPoints[nextI][0] * t,
      orbitPoints[i][1] * (1 - t) + orbitPoints[nextI][1] * t,
      orbitPoints[i][2] * (1 - t) + orbitPoints[nextI][2] * t,
    ];

    // Set translation
    meteoriteRef?.current.setTranslation({
      x: point[0],
      y: point[1],
      z: point[2],
    });

    // Rotate on local axis
    meteoriteRef?.current.setRotation({
      x: pos * 0.2,
      y: pos * 0.4,
      z: pos * 0.1,
    });

    // Increment position along orbit
    positionRef.current = Math.min(pos + speed * 0.2, orbitPoints.length - 1);
  });

  return (
    <>
      <RigidBody
        ref={meteoriteRef}
        type="kinematicPosition"
        colliders="hull"
        gravityScale={0}
      >
        <primitive object={scene} scale={diameterKm / 5} />
      </RigidBody>

      {/* Orbit visualization */}
      <Line points={orbitPoints} color="white" lineWidth={1} />
    </>
  );
}

useGLTF.preload("/models/meteorite.glb");
