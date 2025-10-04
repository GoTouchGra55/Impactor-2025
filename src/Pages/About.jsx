import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Earth from "../Components/Earth";
import { Suspense } from "react";
import Loader from "../Components/Loader";

const About = () => {
  return (
    <div className="relative w-screen h-screen">
      <Canvas className="bg-black">
        <ambientLight intensity={0.2} />
        <pointLight intensity={2} decay={0.1} position={[10, 5, 9]}/>
        <Stars count={400} depth={200} />
        <OrbitControls />
        <Suspense fallback={<Loader />}>
          <Physics>
            <Earth />
          </Physics>
        </Suspense>
      </Canvas>
      <div className="absolute top-10 left-2/5 text-white">
        <h1>Team description</h1>
      </div>
    </div>
  );
};

export default About;
