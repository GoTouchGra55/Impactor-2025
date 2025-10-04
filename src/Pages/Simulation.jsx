import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Satellite from "../Components/Satellite";
import { Physics } from "@react-three/rapier";
import SimAsteroid from "../Components/SimAst";
import Earth from "../Components/Earth";
import { useState } from "react";
import Meteorite from "../Components/MovableAsteroid";

const Simulation = () => {
  const [mode, setMode] = useState(null);

  return (
    <div className="relative w-screen h-screen">
      <Canvas camera={{ position: [-2, 1 / 2, 11.5] }} className="bg-black">
        <ambientLight intensity={0.5} />
        <pointLight intensity={1.5} decay={0.02} position={[10, 10, 5]} />
        <Stars count={4000} radius={500} />
        {mode && <OrbitControls />}
        <Physics>
          <Earth />
          {!mode && (
            <Satellite
              position={[0, -1 / 5, 5]}
              rotation={[Math.PI, -Math.PI / 2, Math.PI]}
            />
          )}
          {!mode && <SimAsteroid position={[0, 0, 10]} />}
          {mode && <Meteorite target={[-110, 5, -1000]} />}
        </Physics>
      </Canvas>
      {!mode && <div className="absolute flex flex-col text-center text-lg text-white top-25 mx-10">
        <h1 className="bg-gray-900 p-4 font-mono rounded-md font-bold text-xl">
          MISSION OBJECTIVE: DEFLECT THE INCOMING ASTEROID
        </h1>
        <h2 className="mt-15 text-2xl">Select a deflection method:</h2>
        <div className="flex flex-col">
          <button
            onClick={() => setMode("Kinetic Impactor")}
            className="w-100 ml-25 p-2 bg-gray-800 text-center text-xl hover:bg-gray-900 mt-10 mb-5 rounded-2xl"
          >
            Kinetic Impactor
          </button>
          <button
            onClick={() => setMode("Gravity Tractor")}
            className="w-100 ml-25 p-2 bg-gray-800 text-center text-xl hover:bg-gray-900 mb-5 rounded-2xl"
          >
            Gravity Tractor
          </button>
          <button
            onClick={() => setMode(null)}
            className="w-100 ml-25 p-2 bg-gray-800 text-center text-xl hover:bg-gray-900 mb-5 rounded-2xl"
          >
            Nuclear Explosion(Coming Soon)
          </button>
        </div>
      </div>}
    </div>
  );
};

export default Simulation;
