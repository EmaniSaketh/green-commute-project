import { useState } from "react";

import Hero from "./components/Hero";
import CommuteForm from "./components/CommuteForm";
import Map from "./components/Map";
import CommuteOptions from "./components/CommuteOptions";
import CarbonStats from "./components/CarbonStats";
import CarbonChart from "./components/CarbonChart";
import Recommendation from "./components/Recommendation";
import SavingsCalculator from "./components/SavingsCalculator";
import ShareResults from "./components/ShareResults";
import AIAdvisor from "./components/AIAdvisor";
import CarbonScore from "./components/CarbonScore";

import { calculateCommute } from "./utils/carbonCalculator";

function App() {

  const [results,  setResults]  = useState([]);
  const [distance, setDistance] = useState(0);
  const [route,    setRoute]    = useState(null);

  const handleCalculate = (data) => {
    const distanceValue = Number(data.distance);
    const commuteData   = calculateCommute(distanceValue, 22);

    setDistance(distanceValue);
    setResults(commuteData || []);
    setRoute({
      start: data.startCoords,
      end:   data.endCoords,
    });
  };

  return (
    <div>

      <Hero />

      <CommuteForm onCalculate={handleCalculate} />

      {/* MAP — pass distance for dynamic zoom */}
      {route && (
        <Map start={route.start} end={route.end} distance={distance} />
      )}

      {/* RESULTS */}
      {results.length > 0 && (
        <>
          {/* Distance indicator */}
          <p style={{
            textAlign: "center",
            color: "#6b9e8f",
            fontSize: "14px",
            marginTop: "20px",
          }}>
            📏 Route distance: <strong style={{ color: "#00ff9c" }}>{distance.toFixed(1)} km</strong>
            &nbsp;·&nbsp; Calculated for 22 working days/month (round trip)
          </p>

          <CommuteOptions results={results} />

          <AIAdvisor results={results} />

          <Recommendation results={results} />

          <SavingsCalculator results={results} />

          <CarbonScore results={results} />

          <CarbonStats results={results} />

          <CarbonChart results={results} />

          <ShareResults results={results} />
        </>
      )}

    </div>
  );
}

export default App;
