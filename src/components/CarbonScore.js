export default function CarbonScore({ results }) {

  if (!results || results.length === 0) return null;

  // Get user's likely current mode (petrol car) vs best available
  const car  = results.find(r => r.name === "Petrol Car");
  const best = [...results].sort((a, b) => parseFloat(a.co2) - parseFloat(b.co2))[0];

  if (!car) return null;

  const carCO2  = parseFloat(car.co2);
  const bestCO2 = parseFloat(best.co2);

  // Score: how much better is the best option vs driving a petrol car
  // 100 = zero emissions, 0 = same as petrol car
  let score = 100;
  if (carCO2 > 0) {
    score = Math.round(((carCO2 - bestCO2) / carCO2) * 100);
  }
  score = Math.max(0, Math.min(100, score));

  let rating = "";
  let color  = "";
  if (score >= 90)      { rating = "Outstanding 🌍"; color = "#00ff9c"; }
  else if (score >= 70) { rating = "Excellent 🌱";   color = "#4ade80"; }
  else if (score >= 50) { rating = "Good 👍";         color = "#a3e635"; }
  else if (score >= 30) { rating = "Average ⚠️";      color = "#facc15"; }
  else                  { rating = "Needs Work 🚨";   color = "#fb923c"; }

  // Circle stroke calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (score / 100) * circumference;

  return (
    <div style={{
      background: "#0f3d33",
      margin: "40px",
      padding: "36px",
      borderRadius: "12px",
      textAlign: "center",
    }}>

      <h2 style={{ marginBottom: "24px" }}>Your Green Commute Score</h2>

      {/* Circular score */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="70" cy="70" r={radius} fill="none" stroke="#0a2e20" strokeWidth="10"/>
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${strokeDash} ${circumference}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
        </svg>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "32px", fontWeight: "800", color, margin: 0 }}>{score}</p>
          <p style={{ fontSize: "11px", color: "#6b9e8f", margin: 0 }}>/ 100</p>
        </div>
      </div>

      <p style={{ marginTop: "16px", fontSize: "18px", fontWeight: "bold", color }}>
        {rating}
      </p>

      <p style={{ color: "#6b9e8f", fontSize: "13px", marginTop: "8px" }}>
        Based on switching from Petrol Car → {best.name}
      </p>

    </div>
  );
}
