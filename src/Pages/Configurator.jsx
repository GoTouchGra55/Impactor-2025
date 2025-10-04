import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Asteroid from "../Components/Asteroid";
import DateSelector from "../Components/DateSelector";
import { useMemo, useState } from "react";
import DisplayInfo from "../Components/DisplayInfo";
import { DiameterContext } from "../Context/DiameterContext";
import { SpeedContext } from "../Context/SpeedContext";
import { Link } from "react-router-dom";

const Configurator = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showSearch, setShowSearch] = useState(true);
  const selectedAsteroid = asteroids.find((a) => a.id === selectedId);

  const speed = useMemo(() => {
    if (!selectedAsteroid) return 1;
    const velocityData =
      selectedAsteroid.close_approach_data?.[0]?.relative_velocity;
    return velocityData ? velocityData.kilometers_per_second : 1;
  }, [selectedAsteroid]);

  const diameterKm = useMemo(() => {
    if (!selectedAsteroid) return 1;
    const {
      estimated_diameter: { kilometers },
    } = selectedAsteroid;
    return (
      (kilometers.estimated_diameter_min + kilometers.estimated_diameter_max) /
      2
    );
  }, [selectedAsteroid]);

  const fetchAsteroids = async (startDate, endDate) => {
    setShowSearch(false);
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
      );
      const json = await response.json();
      const objects = Object.values(json.near_earth_objects).flat();
      setAsteroids(objects);
      setSelectedId("");
    } catch (error) {
      console.log("Failed to fetch asteroids.", error);
      setAsteroids([]);
    }
  };

  return (
    <DiameterContext.Provider value={diameterKm}>
      <SpeedContext.Provider value={speed / 10}>
        <div className="relative w-screen h-screen">
          <Canvas camera={{ position: [5, 5, 5] }} className="bg-black">
            <OrbitControls />
            <ambientLight intensity={0.3} />
            <directionalLight intensity={1} />
            <Stars count={400} depth={200} />
            <Asteroid />
          </Canvas>
          {showSearch && <DateSelector onFetch={fetchAsteroids} />}
          {asteroids.length > 0 && !showSearch && (
            <div className="absolute top-30 left-1/9 bg-white/10 text-white p-4 rounded-md">
              <label htmlFor="asteroid" className="font-bold">
                Select Asteroid:{" "}
              </label>
              <select
                id="asteroid"
                value={selectedId}
                className="bg-gray-500 rounded-md"
                onChange={(e) => setSelectedId(e.target.value)}
              >
                <option value="" className="bg-gray-700 text-white">
                  --Select--
                </option>
                {asteroids.map((asteroid) => (
                  <option
                    id={asteroid.id}
                    key={asteroid.id}
                    value={asteroid.id}
                    className="bg-gray-700 text-white"
                  >
                    {asteroid.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {selectedAsteroid && !showSearch && (
            <div>
              <DisplayInfo selectedAsteroid={selectedAsteroid} />
              {diameterKm > 0.1 ? (
                <Link
                  to={"/configure/deflect"}
                  className="absolute bottom-50 left-1/9 font-bold text-lg text-white bg-green-600 p-3 cursor-pointer rounded-md"
                >
                  Start Simulation
                </Link>
              ) : (
                <div className="absolute bottom-50 left-1/9 font-bold text-lg text-white bg-red-600 p-3 cursor-pointer rounded-md">
                  Too small for simulation
                </div>
              )}
              <div className="absolute bottom-30 left-1/9 font-bold text-lg text-white">
                <button
                  onClick={() => setShowSearch(true)}
                  className="bg-white/10 p-3 cursor-pointer rounded-md"
                >
                  Search New Asteroid
                </button>
              </div>
            </div>
          )}
        </div>
      </SpeedContext.Provider>
    </DiameterContext.Provider>
  );
};

export default Configurator;
