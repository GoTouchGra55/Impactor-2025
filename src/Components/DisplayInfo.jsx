const DisplayInfo = ({ selectedAsteroid }) => {
  if (!selectedAsteroid) return null; // safeguard

  const {
    name,
    estimated_diameter,
    close_approach_data,
    is_potentially_hazardous_asteroid,
  } = selectedAsteroid;

  const diameterKm =
    (estimated_diameter.kilometers.estimated_diameter_min +
      estimated_diameter.kilometers.estimated_diameter_max) /
    2;

  const speed = parseFloat(
    close_approach_data[0].relative_velocity.kilometers_per_second
  ).toFixed(2);

  const missDistance = parseFloat(
    close_approach_data[0].miss_distance.kilometers
  ).toFixed(2);

  return (
    <div className="absolute bg-white/10 text-white top-50 left-1/9 w-80 p-4 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-2">{name}</h1>
      <h2>Diameter: {diameterKm.toFixed(2)} km</h2>
      <h2>Speed: {speed} km/s</h2>
      <h2>Miss Distance: {missDistance} km</h2>
      <h2>
        Status:{" "}
        {is_potentially_hazardous_asteroid ? (
          <span className="text-red-600">Hazardous</span>
        ) : (
          <span className="text-green-600">Safe</span>
        )}
      </h2>
    </div>
  );
};

export default DisplayInfo;
