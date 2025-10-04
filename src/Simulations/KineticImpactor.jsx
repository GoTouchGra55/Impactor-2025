import { Physics } from "@react-three/rapier";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";

import Loader from "../Components/Loader";
import Earth from "../Components/Earth";

const KineticImpactor = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas className="bg-black">
        <ambientLight intensity={0.2}/>
        <pointLight intensity={2} decay={0.02} position={[100, 100, 100]}/>
        <Stars count={400} depth={200}/>
        <OrbitControls />
        <Suspense fallback={<Loader />}>
          <Physics>
            
            
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default KineticImpactor;
