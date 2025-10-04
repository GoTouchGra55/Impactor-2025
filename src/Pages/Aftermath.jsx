import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  useMapEvents,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { BaseLayer } = LayersControl;

const NASA_API_KEY = import.meta.env.VITE_API_KEY; // <-- Replace with your NASA API key

/* ---------------------------
   WorldPop WOPR API Integration
   --------------------------- */

// Function to get country ISO code from coordinates
async function getCountryISO3(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=3`
    );
    const data = await response.json();
    const iso2 = data.address?.country_code?.toUpperCase();

    // If no country found (likely clicked on sea)
    if (!iso2) {
      console.warn("Clicked on sea or unrecognized area");
      return "SEA"; // You can return null, 'SEA', or any custom code
    }

    // Full ISO2 to ISO3 mapping
    const iso2ToIso3 = {
      AF: "AFG",
      AL: "ALB",
      DZ: "DZA",
      AS: "ASM",
      AD: "AND",
      AO: "AGO",
      AI: "AIA",
      AQ: "ATA",
      AG: "ATG",
      AR: "ARG",
      AM: "ARM",
      AW: "ABW",
      AU: "AUS",
      AT: "AUT",
      AZ: "AZE",
      BS: "BHS",
      BH: "BHR",
      BD: "BGD",
      BB: "BRB",
      BY: "BLR",
      BE: "BEL",
      BZ: "BLZ",
      BJ: "BEN",
      BM: "BMU",
      BT: "BTN",
      BO: "BOL",
      BA: "BIH",
      BW: "BWA",
      BR: "BRA",
      BN: "BRN",
      BG: "BGR",
      BF: "BFA",
      BI: "BDI",
      CV: "CPV",
      KH: "KHM",
      CM: "CMR",
      CA: "CAN",
      KY: "CYM",
      CF: "CAF",
      TD: "TCD",
      CL: "CHL",
      CN: "CHN",
      CO: "COL",
      KM: "COM",
      CG: "COG",
      CD: "COD",
      CR: "CRI",
      HR: "HRV",
      CU: "CUB",
      CY: "CYP",
      CZ: "CZE",
      DK: "DNK",
      DJ: "DJI",
      DM: "DMA",
      DO: "DOM",
      EC: "ECU",
      EG: "EGY",
      SV: "SLV",
      GQ: "GNQ",
      ER: "ERI",
      EE: "EST",
      ET: "ETH",
      FJ: "FJI",
      FI: "FIN",
      FR: "FRA",
      GA: "GAB",
      GM: "GMB",
      GE: "GEO",
      DE: "DEU",
      GH: "GHA",
      GR: "GRC",
      GD: "GRD",
      GT: "GTM",
      GN: "GIN",
      GW: "GNB",
      GY: "GUY",
      HT: "HTI",
      HN: "HND",
      HK: "HKG",
      HU: "HUN",
      IS: "ISL",
      IN: "IND",
      ID: "IDN",
      IR: "IRN",
      IQ: "IRQ",
      IE: "IRL",
      IL: "ISR",
      IT: "ITA",
      JM: "JAM",
      JP: "JPN",
      JO: "JOR",
      KZ: "KAZ",
      KE: "KEN",
      KR: "KOR",
      KW: "KWT",
      KG: "KGZ",
      LA: "LAO",
      LV: "LVA",
      LB: "LBN",
      LS: "LSO",
      LR: "LBR",
      LY: "LBY",
      LI: "LIE",
      LT: "LTU",
      LU: "LUX",
      MO: "MAC",
      MG: "MDG",
      MW: "MWI",
      MY: "MYS",
      MV: "MDV",
      ML: "MLI",
      MT: "MLT",
      MH: "MHL",
      MR: "MRT",
      MU: "MUS",
      MX: "MEX",
      FM: "FSM",
      MD: "MDA",
      MC: "MCO",
      MN: "MNG",
      ME: "MNE",
      MA: "MAR",
      MZ: "MOZ",
      MM: "MMR",
      NA: "NAM",
      NR: "NRU",
      NP: "NPL",
      NL: "NLD",
      NZ: "NZL",
      NI: "NIC",
      NE: "NER",
      NG: "NGA",
      NO: "NOR",
      OM: "OMN",
      PK: "PAK",
      PW: "PLW",
      PA: "PAN",
      PG: "PNG",
      PY: "PRY",
      PE: "PER",
      PH: "PHL",
      PL: "POL",
      PT: "PRT",
      QA: "QAT",
      RO: "ROU",
      RU: "RUS",
      RW: "RWA",
      KN: "KNA",
      LC: "LCA",
      VC: "VCT",
      WS: "WSM",
      SM: "SMR",
      ST: "STP",
      SA: "SAU",
      SN: "SEN",
      RS: "SRB",
      SC: "SYC",
      SL: "SLE",
      SG: "SGP",
      SK: "SVK",
      SI: "SVN",
      SB: "SLB",
      SO: "SOM",
      ZA: "ZAF",
      ES: "ESP",
      LK: "LKA",
      SD: "SDN",
      SR: "SUR",
      SE: "SWE",
      CH: "CHE",
      SY: "SYR",
      TW: "TWN",
      TJ: "TJK",
      TZ: "TZA",
      TH: "THA",
      TL: "TLS",
      TG: "TGO",
      TO: "TON",
      TT: "TTO",
      TN: "TUN",
      TR: "TUR",
      TM: "TKM",
      UG: "UGA",
      UA: "UKR",
      AE: "ARE",
      GB: "GBR",
      US: "USA",
      UY: "URY",
      UZ: "UZB",
      VE: "VEN",
      VN: "VNM",
      YE: "YEM",
      ZM: "ZMB",
      ZW: "ZWE",
    };

    return iso2ToIso3[iso2] || iso2; // return ISO3 or fallback ISO2
  } catch (error) {
    console.warn("Country detection failed, defaulting:", error);
    return "SEA";
  }
}

// Function to submit polygon query to WorldPop WOPR API
async function submitWorldPopQuery(geojson, countryISO3) {
  try {
    // URL encode the GeoJSON
    const geojsonEncoded = encodeURIComponent(JSON.stringify(geojson));

    // Submit the polygon query
    const queryUrl = `https://api.worldpop.org/v1/wopr/polytotal?iso3=${countryISO3}&ver=1.2&geojson=${geojsonEncoded}`;

    const response = await fetch(queryUrl);
    if (!response.ok) {
      throw new Error(`WorldPop query submission failed: ${response.status}`);
    }

    const data = await response.json();
    return data.task_id;
  } catch (error) {
    throw new Error(`WorldPop query failed: ${error.message}`);
  }
}

// Function to check task status and get results
async function getWorldPopTaskResult(taskId, maxRetries = 10) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(
        `https://api.worldpop.org/v1/tasks/${taskId}`
      );

      if (!response.ok) {
        throw new Error(`Task status check failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "SUCCESS" && data.result) {
        // Calculate mean population from the distribution
        const populationArray = data.result;
        const meanPopulation = Math.round(
          populationArray.reduce((sum, val) => sum + val, 0) /
            populationArray.length
        );
        return meanPopulation;
      } else if (data.status === "PENDING" || data.status === "STARTED") {
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, 2000));
        continue;
      } else if (data.status === "FAILURE") {
        throw new Error("WorldPop task failed");
      }
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  throw new Error("WorldPop task timeout");
}

// Main function to get population data from WorldPop
async function getWorldPopPopulation(geojson, lat, lng) {
  try {
    // Get country ISO code
    const countryISO3 = await getCountryISO3(lat, lng);

    // Submit query and get task ID
    const taskId = await submitWorldPopQuery(geojson, countryISO3);

    // Wait for and get results
    const population = await getWorldPopTaskResult(taskId);

    return population;
  } catch (error) {
    console.warn("WorldPop API failed, using fallback estimation:", error);
    // Fallback to estimation
    return estimatePopulationByArea(geojson);
  }
}

// Fallback estimation based on area and location
function estimatePopulationByArea(geojson) {
  // Calculate area from GeoJSON coordinates (simplified)
  const coordinates = geojson.features[0].geometry.coordinates[0];
  let area = 0;

  for (let i = 0; i < coordinates.length - 1; i++) {
    const [lon1, lat1] = coordinates[i];
    const [lon2, lat2] = coordinates[i + 1];
    area += ((lon2 - lon1) * (lat1 + lat2)) / 2;
  }

  const areaKm2 = Math.abs(area) * 111 * 111; // Rough conversion to km²

  // Conservative global average density
  const averageDensity = 50; // people/km²
  return Math.round(areaKm2 * averageDensity);
}

/* ---------------------------
   Helper functions
   --------------------------- */

function destinationPoint(lat, lon, distanceKm, bearingDeg) {
  const R = 6371.0088;
  const δ = distanceKm / R;
  const θ = (bearingDeg * Math.PI) / 180;

  const φ1 = (lat * Math.PI) / 180;
  const λ1 = (lon * Math.PI) / 180;

  const sinφ1 = Math.sin(φ1);
  const cosφ1 = Math.cos(φ1);
  const sinδ = Math.sin(δ);
  const cosδ = Math.cos(δ);

  const sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * Math.cos(θ);
  const φ2 = Math.asin(Math.min(1, Math.max(-1, sinφ2)));

  const y = Math.sin(θ) * sinδ * cosφ1;
  const x = cosδ - sinφ1 * sinφ2;
  const λ2 = λ1 + Math.atan2(y, x);

  return [(φ2 * 180) / Math.PI, (((λ2 * 180) / Math.PI + 540) % 360) - 180];
}

function makeCircleGeoJSON(lat, lon, radiusKm, steps = 64) {
  const coords = [];
  for (let i = 0; i < steps; i++) {
    const bearing = (i * 360) / steps;
    const [lat2, lon2] = destinationPoint(lat, lon, radiusKm, bearing);
    coords.push([lon2, lat2]);
  }
  coords.push(coords[0]);

  // Return in proper WOPR API format
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [coords],
        },
      },
    ],
  };
}

function estimateImpactMagnitude(diameterKm, velocityKmPerS) {
  const diameterM = diameterKm * 1000;
  const radiusM = diameterM / 2;
  const density = 3000;
  const volume = (4 / 3) * Math.PI * Math.pow(radiusM, 3);
  const mass = density * volume;
  const velocityMs = velocityKmPerS * 1000;
  const energyJ = 0.5 * mass * Math.pow(velocityMs, 2);
  const mag = (Math.log10(Math.max(energyJ, 1)) - 4.4) / 1.5;
  return Math.max(0, parseFloat(mag.toFixed(2)));
}

/* ---------------------------
   Main Aftermath Component
   --------------------------- */

const Aftermath = () => {
  const [meteors, setMeteors] = useState([]);
  const [selectedMeteor, setSelectedMeteor] = useState(null);
  const [impactPoint, setImpactPoint] = useState(null);
  const [impactRings, setImpactRings] = useState([]);
  const [animationCircle, setAnimationCircle] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [impactDetails, setImpactDetails] = useState(null);
  const [loadingPopulation, setLoadingPopulation] = useState(false);
  const [dataSource, setDataSource] = useState("Unknown");
  const mapRef = useRef(null);

  // Fetch NASA NeoWs (browse)
  useEffect(() => {
    const fetchMeteors = async () => {
      try {
        const res = await fetch(
          `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${NASA_API_KEY}`
        );
        const data = await res.json();
        if (data?.near_earth_objects) {
          const list = data.near_earth_objects.slice(0, 20).map((obj) => {
            const diameterKm =
              (obj.estimated_diameter.kilometers.estimated_diameter_min +
                obj.estimated_diameter.kilometers.estimated_diameter_max) /
              2;
            const craterFactor =
              diameterKm > 1 ? 0.12 : diameterKm > 0.5 ? 0.08 : 0.05;
            return {
              id: obj.id,
              name: obj.name,
              diameterKm: parseFloat(diameterKm.toFixed(3)),
              velocity:
                parseFloat(
                  obj.close_approach_data?.[0]?.relative_velocity
                    ?.kilometers_per_second ?? 20
                ) || 20,
              radii: [
                diameterKm * 5000,
                diameterKm * 10000,
                diameterKm * 20000,
              ],
              craterFactor,
            };
          });
          setMeteors(list);
          if (list.length) setSelectedMeteor(list[0]);
        }
      } catch (err) {
        console.error("NASA fetch error:", err);
      }
    };
    fetchMeteors();
  }, []);

  // Update rings when meteor changed and we already have an impact point
  useEffect(() => {
    if (impactPoint && selectedMeteor) {
      drawImpactRings(impactPoint.lat, impactPoint.lng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMeteor]);

  // Map click handler as component
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        triggerImpact(lat, lng);
      },
    });
    return null;
  };

  // Trigger impact: animate, draw rings, fetch populations and magnitude
  const triggerImpact = async (lat, lng) => {
    if (!selectedMeteor) return;
    setImpactPoint({ lat, lng });
    setImpactRings([]);
    setPopulationData(null);
    setImpactDetails(null);
    setLoadingPopulation(true);
    setDataSource("Calculating...");

    animateImpact(lat, lng);
    setTimeout(() => drawImpactRings(lat, lng), 900);

    try {
      const outerRadiusMeters = selectedMeteor.radii[2];
      const outerRadiusKm = outerRadiusMeters / 1000;
      const outerGeo = makeCircleGeoJSON(lat, lng, outerRadiusKm, 64);

      // Use WorldPop WOPR API
      const outerPop = await getWorldPopPopulation(outerGeo, lat, lng);

      setDataSource("WorldPop WOPR API");

      // Calculate inner ring populations based on area
      const outerArea = Math.PI * Math.pow(outerRadiusKm, 2);
      const innerRadiusKm = selectedMeteor.radii[0] / 1000;
      const midRadiusKm = selectedMeteor.radii[1] / 1000;
      const innerArea = Math.PI * Math.pow(innerRadiusKm, 2);
      const midArea = Math.PI * Math.pow(midRadiusKm, 2);

      const population_inner = Math.round((innerArea / outerArea) * outerPop);
      const population_mid = Math.round((midArea / outerArea) * outerPop);
      const population_outer_only = Math.max(
        0,
        Math.round(outerPop - population_mid)
      );

      const magnitude = estimateImpactMagnitude(
        selectedMeteor.diameterKm,
        selectedMeteor.velocity
      );

      setPopulationData({
        outerTotal: outerPop,
        inner: population_inner,
        mid: population_mid,
        outerOnly: population_outer_only,
      });

      setImpactDetails({
        magnitude,
        energyIndicator: (
          selectedMeteor.diameterKm * selectedMeteor.velocity
        ).toFixed(2),
      });
    } catch (err) {
      console.error("Population / impact detail error:", err);
      setPopulationData("Unavailable");
      setImpactDetails({ magnitude: "--" });
      setDataSource("Error - Using Estimates");
    } finally {
      setLoadingPopulation(false);
    }
  };

  // animate expanding circle centered on lat/lng
  const animateImpact = (lat, lng) => {
    const maxRadius = Math.max(1000, selectedMeteor.diameterKm * 8000);
    let current = 0;
    const step = maxRadius / 25;
    const interval = setInterval(() => {
      current += step;
      setAnimationCircle({
        center: [lat, lng],
        radius: current,
        color: "#ff3333",
        opacity: Math.max(0.08, 0.4 - current / maxRadius / 2),
      });
      if (current >= maxRadius) {
        clearInterval(interval);
        setTimeout(() => setAnimationCircle(null), 500);
      }
    }, 40);
  };

  const drawImpactRings = (lat, lng) => {
    if (!selectedMeteor) return;
    const rings = selectedMeteor.radii.map((r, i) => ({
      center: [lat, lng],
      radius: r,
      color: ["#ff0000", "#ff9900", "#ffff00"][i],
    }));
    setImpactRings(rings);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Meteor dropdown */}
      <div
        className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-xl border border-gray-600 backdrop-blur-md"
        style={{ zIndex: 9999 }}
      >
        <label className="block text-sm mb-1">☄️ Select Meteor</label>
        <select
          className="bg-gray-800 text-white p-2 rounded w-64 border border-gray-500 focus:outline-none"
          value={selectedMeteor?.id || ""}
          onChange={(e) =>
            setSelectedMeteor(
              meteors.find((m) => m.id === e.target.value) || meteors[0]
            )
          }
        >
          {meteors.length > 0 ? (
            meteors.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} — {m.diameterKm} km
              </option>
            ))
          ) : (
            <option>Loading NASA data...</option>
          )}
        </select>
      </div>

      {/* Map */}
      <MapContainer
        ref={mapRef}
        center={[30, 70]}
        zoom={3}
        style={{ height: "100%", width: "100%" }}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="Satellite (Space View)">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </BaseLayer>

          <BaseLayer name="NASA SEDAC Population Density">
            <TileLayer
              url="https://sedac.ciesin.columbia.edu/geoserver/wms"
              layers="gpw-v4:gpw-v4-population-density_2020"
              format="image/png"
              transparent={true}
              version="1.1.0"
            />
          </BaseLayer>

          <BaseLayer name="Dark Map">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
              attribution="&copy; CartoDB"
            />
          </BaseLayer>
        </LayersControl>

        <MapClickHandler />

        {/* Animated shockwave */}
        {animationCircle && (
          <Circle
            center={animationCircle.center}
            radius={animationCircle.radius}
            pathOptions={{
              color: animationCircle.color,
              opacity: animationCircle.opacity,
              fillOpacity: animationCircle.opacity,
            }}
          />
        )}

        {/* Severity rings */}
        {impactRings.map((ring, i) => (
          <Circle
            key={i}
            center={ring.center}
            radius={ring.radius}
            pathOptions={{
              color: ring.color,
              weight: 2,
              fillOpacity: 0.05,
            }}
          />
        ))}
      </MapContainer>

      {/* Info Panel */}
      {impactPoint && selectedMeteor && (
        <div
          className="absolute bottom-6 left-6 bg-black/70 text-white p-4 rounded-xl border border-gray-600 w-96 backdrop-blur-md"
          style={{ zIndex: 9999 }}
        >
          <h3 className="font-semibold text-lg mb-2 text-yellow-300">
            🌠 Impact Analysis
          </h3>

          <p>
            <strong>Meteor:</strong> {selectedMeteor.name}
          </p>
          <p>
            <strong>Diameter:</strong> {selectedMeteor.diameterKm} km
          </p>
          <p>
            <strong>Velocity:</strong> {selectedMeteor.velocity} km/s
          </p>
          <p>
            <strong>Location:</strong> {impactPoint.lat.toFixed(4)},{" "}
            {impactPoint.lng.toFixed(4)}
          </p>

          <hr className="my-2" />

          <div className="mb-2">
            <strong>Data Source:</strong>
            <span
              className={`ml-2 ${
                dataSource.includes("WorldPop")
                  ? "text-green-400"
                  : dataSource.includes("Estimated")
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {dataSource}
              {loadingPopulation && " (Loading...)"}
            </span>
          </div>

          <p>
            <strong>Population (outer ring total):</strong>{" "}
            {populationData && typeof populationData === "object"
              ? (populationData.outerTotal ?? 0).toLocaleString()
              : loadingPopulation
              ? "Loading..."
              : "Calculating..."}
          </p>
          <p>
            <strong>Population (inner ring):</strong>{" "}
            {populationData?.inner?.toLocaleString() ??
              (loadingPopulation ? "Loading..." : "--")}
          </p>
          <p>
            <strong>Population (mid ring):</strong>{" "}
            {populationData?.mid?.toLocaleString() ??
              (loadingPopulation ? "Loading..." : "--")}
          </p>

          <hr className="my-2" />

          <p>
            <strong>Estimated Earthquake Magnitude (approx):</strong>{" "}
            {impactDetails?.magnitude ?? "--"}
          </p>
          <p>
            <strong>Energy Indicator (diameter*velocity):</strong>{" "}
            {impactDetails?.energyIndicator ?? "--"}
          </p>

          <p className="mt-2 text-sm text-gray-300">
            Note: Population data from WorldPop WOPR API with uncertainty
            modeling. Inner/mid rings estimated by area proportion. Magnitude is
            approximate.
          </p>
        </div>
      )}
    </div>
  );
};

export default Aftermath;
