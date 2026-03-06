import { useState } from "react";

export default function CarbonScore({ results }) {

  // ✅ useState MUST be before any early return
  const [selectedMode, setSelectedMode] = useState("Petrol Car");

  if (!results || results.length === 0) return null;

  const modes   = results.map(r => r.name);
  const current = results.find(r => r.name === selectedMode) || results[0];

  const practical = results.filter(r => !["Walking", "Bicycle"].includes(r.name));

  const maxCo2  = Math.max(...practical.map(r => parseFloat(r.co2)));
  const maxCost = Math.max(...practical.map(r => parseFloat(r.cost)));
  const maxTime = Math.max(...practical.map(r => parseFloat(r.time)));

  const scored = practical.map(r => ({
    ...r,
    score:
      (parseFloat(r.co2)  / maxCo2)  * 0.35 +
      (parseFloat(r.cost) / maxCost) * 0.40 +
      (parseFloat(r.time) / maxTime) * 0.25,
  }));

  const best = scored.sort((a, b) => a.score - b.score)[0];

  const currentCo2 = parseFloat(current.co2);
  const bestCo2    = parseFloat(best.co2);

  let score = 100;
  if (currentCo2 > bestCo2 && currentCo2 > 0) {
    score = Math.round(((currentCo2 - bestCo2) / currentCo2) * 100);
  } else if (current.name !== best.name) {
    const car    = results.find(r => r.name === "Petrol Car");
    const carCo2 = car ? parseFloat(car.co2) : currentCo2;
    score = carCo2 > 0 ? Math.round(((carCo2 - bestCo2) / carCo2) * 100) : 50;
  }
  score = Math.max(0, Math.min(100, score));

  let rating = "";
  let color  = "";
  if      (score >= 80) { rating = "Outstanding 🌍"; color = "#00ff9c"; }
  else if (score >= 60) { rating = "Excellent 🌱";   color = "#4ade80"; }
  else if (score >= 40) { rating = "Good 👍";         color = "#a3e635"; }
  else if (score >= 20) { rating = "Average ⚠️";      color = "#facc15"; }
  else                  { rating = "Needs Work 🚨";   color = "#fb923c"; }

  const radius        = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDash    = (score / 100) * circumference;

  const co2Saved   = Math.max(0, currentCo2 - bestCo2).toFixed(1);
  const moneySaved = Math.max(0, parseFloat(current.cost) - parseFloat(best.cost)).toFixed(0);

  const icons = {
    "Walking":     "🚶", "Bicycle":     "🚲", "E-Scooter":   "🛴",
    "Railways":    "🚆", "EV Car":      "⚡", "City Bus":    "🚌",
    "Shared Cab":  "🚕", "Petrol Bike": "🏍️", "CNG Car":     "🚗",
    "Diesel Car":  "🚗", "Petrol Car":  "🚗",
  };

  return (
    <div style={{ background: "#0f3d33", margin: "40px", padding: "36px", borderRadius: "12px", textAlign: "center" }}>

      <h2 style={{ marginBottom: "8px" }}>Your Green Commute Score</h2>
      <p style={{ color: "#6b9e8f", fontSize: "13px", marginBottom: "24px" }}>
        Select your current travel mode to see your score
      </p>

      {/* Mode selector */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "32px" }}>
        {modes.map((name) => (
          <button
            key={name}
            onClick={() => setSelectedMode(name)}
            style={{
              padding: "8px 16px", borderRadius: "8px",
              border:      selectedMode === name ? `2px solid ${color}` : "1px solid #1a4d36",
              background:  selectedMode === name ? "rgba(0,255,156,0.1)" : "#0a2e20",
              color:       selectedMode === name ? "#fff" : "#6b9e8f",
              cursor: "pointer", fontSize: "13px",
              fontWeight:  selectedMode === name ? "700" : "400",
              transition: "all 0.2s",
            }}
          >
            {icons[name]} {name}
          </button>
        ))}
      </div>

      {/* Circle */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="70" cy="70" r={radius} fill="none" stroke="#0a2e20" strokeWidth="10" />
          <circle cx="70" cy="70" r={radius} fill="none" stroke={color} strokeWidth="10"
            strokeDasharray={`${strokeDash} ${circumference}`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
          <p style={{ fontSize: "32px", fontWeight: "800", color, margin: 0 }}>{score}</p>
          <p style={{ fontSize: "11px", color: "#6b9e8f", margin: 0 }}>/ 100</p>
        </div>
      </div>

      <p style={{ marginTop: "16px", fontSize: "18px", fontWeight: "bold", color }}>{rating}</p>
      <p style={{ color: "#6b9e8f", fontSize: "13px", marginTop: "8px" }}>
        You use <strong style={{ color: "#fff" }}>{icons[selectedMode]} {selectedMode}</strong>
        &nbsp;→ best switch is <strong style={{ color }}>{icons[best.name]} {best.name}</strong>
      </p>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "32px" }}>
        <div>
          <p style={{ color: "#00ff9c", fontWeight: "bold", fontSize: "18px" }}>{co2Saved} kg</p>
          <p style={{ color: "#6b9e8f", fontSize: "12px" }}>CO₂ saved/month</p>
        </div>
        <div>
          <p style={{ color: "#facc15", fontWeight: "bold", fontSize: "18px" }}>₹{moneySaved}</p>
          <p style={{ color: "#6b9e8f", fontSize: "12px" }}>saved/month</p>
        </div>
      </div>

    </div>
  );
}