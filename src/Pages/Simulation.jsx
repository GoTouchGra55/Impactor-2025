import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Simulation = () => {
  return (
    <div className="relative w-screen h-screen">
      <Canvas className="bg-black">
        <Stars count={400} depth={200} />
        <OrbitControls />
        
      </Canvas>
    </div>
  );
};

export default Simulation;
