import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { OrbitControls, Stars } from "@react-three/drei";
import Asteroid from "../Components/Asteroid";

const MainMenu = () => {
  return (
    <div className="relative w-screen h-screen">
      <Canvas camera={{ position: [5, 5, 5] }} className="bg-black">
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <directionalLight intensity={1} />
        <Stars count={400} depth={200} />
        <Asteroid />
      </Canvas>

      <div className="flex flex-col absolute text-white left-1/12 top-20">
        <div className="px-6 py-3 bg-white/10 rounded-2xl">
          <h1 className="text-2xl font-bold">Impactor 2025</h1>
          <h2>Speed: 10.5 km/s</h2>
          <h2>Approach Distance: 500000 km</h2>
          <h2>
            Status: <span className="text-red-600 font-bold">Hazardous</span>
          </h2>
          <h2>Time Remaining: 13.23 hrs</h2>
        </div>
        <div className="flex flex-col text-center mt-10 text-2xl">
          <Link
            to={"/configure"}
            className="bg-white/20 rounded-md m-4 px-20 py-3 cursor-pointer hover:bg-gray-800"
          >
            Defend the Earth 🛡️
          </Link>
          <Link
            to={"/aftermath"}
            className="bg-white/20 rounded-md m-4 py-3 cursor-pointer hover:bg-gray-800"
          >
            Impact Aftermath 💥
          </Link>
          <Link
            to={"/about"}
            className="bg-white/20 rounded-md m-4 py-3 cursor-pointer hover:bg-gray-800"
          >
            Rocket Rookies 🚀
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
