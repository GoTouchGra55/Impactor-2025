import { useGLTF, Line } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useContext } from "react";
import { DiameterContext } from "../Context/DiameterContext";
import { SpeedContext } from "../Context/SpeedContext";

// Generate a curved orbit ending at the target position
const generateOrbit = (target = [0, 0, 0], steps = 10000) => {
  const points = [];
  const [tx, ty, tz] = target;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps; // normalized 0 → 1

    // Start far away, curve in Y, end at target
    const x = 10 * (1 - t) + tx * t;
    const y = 25 * Math.sin(Math.PI * t) + ty * 2 * t;
    const z = 10 * (1 - t) + tz * t;

    points.push([x, y, z]);
  }
  return points;
};

export default function Meteorite({ target = [0, 0, 0] }) {
  const { scene } = useGLTF("/models/meteorite.glb");
  const meteoriteRef = useRef();
  const diameterKm = useContext(DiameterContext);
  const speed = useContext(SpeedContext);
  const orbitPoints = useMemo(() => generateOrbit(target), [target]);

  // Float index for smooth interpolation
  const positionRef = useRef(0);

  useFrame(() => {
    if (!meteoriteRef.current) return;

    const pos = positionRef.current;
    const i = Math.floor(pos);
    const nextI = Math.min(i + 1, orbitPoints.length - 1);
    const t = pos - i; // fractional progress

    // Interpolate between current and next orbit point
    const point = [
      orbitPoints[i][0] * (1 - t) + orbitPoints[nextI][0] * t,
      orbitPoints[i][1] * (1 - t) + orbitPoints[nextI][1] * t,
      orbitPoints[i][2] * (1 - t) + orbitPoints[nextI][2] * t,
    ];

    meteoriteRef.current.setTranslation({ x: point[0], y: point[1], z: point[2] });
    meteoriteRef.current.setAngvel({ x: -0.05, y: 0.1, z: 0 }, true);

    // Increment float position by speed, cap at the last point
    positionRef.current = Math.min(pos + speed, orbitPoints.length - 1);
  });

  return (
    <>
      <RigidBody
        ref={meteoriteRef}
        type="dynamic"
        colliders="hull"
        gravityScale={0}
      >
        <primitive object={scene} scale={diameterKm / 5} />
      </RigidBody>

      {/* Orbit Visualization */}
      <Line points={orbitPoints} color="white" lineWidth={1} />
    </>
  );
}

useGLTF.preload("/models/meteorite.glb");
