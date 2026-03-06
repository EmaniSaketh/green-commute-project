export default function Recommendation({ results }) {

  if (!results || results.length === 0) return null;

  // Filter out unrealistic modes for long distances
  // Walking > 3km and Cycling > 15km are not practical
  const car = results.find(r => r.name === "Petrol Car");
  const carTime = car ? parseFloat(car.time) : 999;

  const practical = results.filter(r => {
    if (r.name === "Walking"  && parseFloat(r.time) > 45) return false;
    if (r.name === "Bicycle"  && parseFloat(r.time) > 60) return false;
    return true;
  });

  if (practical.length === 0) return null;

  // Scoring: balanced score using CO2 + cost + time (normalized)
  const maxCo2  = Math.max(...practical.map(r => parseFloat(r.co2)));
  const maxCost = Math.max(...practical.map(r => parseFloat(r.cost)));
  const maxTime = Math.max(...practical.map(r => parseFloat(r.time)));

  const scored = practical.map(r => {
    const co2Score  = maxCo2  > 0 ? parseFloat(r.co2)  / maxCo2  : 0;
    const costScore = maxCost > 0 ? parseFloat(r.cost) / maxCost : 0;
    const timeScore = maxTime > 0 ? parseFloat(r.time) / maxTime : 0;

    // Weighted: cost 40% + co2 35% + time 25%
    const score = (costScore * 0.40) + (co2Score * 0.35) + (timeScore * 0.25);
    return { ...r, score };
  });

  // Sort by score ascending (lower = better)
  const ranked = scored.sort((a, b) => a.score - b.score);

  // Pick top 3 distinct recommendations
  const rec1 = ranked[0]; // Best overall balance
  const rec2 = ranked.filter(r => r.name !== rec1.name)
                      .sort((a, b) => parseFloat(a.time) - parseFloat(b.time))[0]; // Fastest among rest
  const rec3 = ranked.filter(r => r.name !== rec1.name && r.name !== rec2?.name)
                      .sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost))[0]; // Cheapest among rest

  const recommendations = [
    {
      rank:    "🥇",
      label:   "Best Overall",
      desc:    "Best balance of cost, CO₂ and time",
      data:    rec1,
      color:   "#00ff9c",
      border:  "#00ff9c44",
      bg:      "#0a2e20",
    },
    {
      rank:    "🥈",
      label:   "Fastest Practical",
      desc:    "Gets you there quickest at reasonable cost",
      data:    rec2,
      color:   "#60a5fa",
      border:  "#60a5fa44",
      bg:      "#0a1f3d",
    },
    {
      rank:    "🥉",
      label:   "Most Affordable",
      desc:    "Lowest monthly spend with decent emissions",
      data:    rec3,
      color:   "#facc15",
      border:  "#facc1544",
      bg:      "#2e2800",
    },
  ].filter(r => r.data); // remove if undefined

  const icons = {
    "Walking":     "🚶",
    "Bicycle":     "🚲",
    "E-Scooter":   "🛴",
    "Railways":    "🚆",
    "EV Car":      "⚡",
    "City Bus":    "🚌",
    "Shared Cab":  "🚕",
    "Petrol Bike": "🏍️",
    "CNG Car":     "🚗",
    "Diesel Car":  "🚗",
    "Petrol Car":  "🚗",
  };

  // Savings vs petrol car
  const savingsVsCar = (mode) => {
    if (!car || mode.name === "Petrol Car") return null;
    const co2Saved   = (parseFloat(car.co2)  - parseFloat(mode.co2)).toFixed(1);
    const moneySaved = (parseFloat(car.cost) - parseFloat(mode.cost)).toFixed(0);
    return { co2Saved, moneySaved };
  };

  return (
    <div style={{ padding: "0 40px 40px 40px" }}>

      <h2 style={{ marginBottom: "8px" }}>💡 Smart Recommendations</h2>
      <p style={{ color: "#6b9e8f", fontSize: "14px", marginBottom: "24px" }}>
        Practical picks based on balanced cost, emissions and travel time
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "16px",
      }}>
        {recommendations.map((rec, i) => {
          const savings = savingsVsCar(rec.data);
          return (
            <div key={i} style={{
              background:    rec.bg,
              border:        `1px solid ${rec.border}`,
              borderRadius:  "14px",
              padding:       "24px",
            }}>

              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <span style={{ fontSize: "28px" }}>{rec.rank}</span>
                <div>
                  <p style={{ color: rec.color, fontWeight: "700", fontSize: "14px" }}>{rec.label}</p>
                  <p style={{ color: "#6b9e8f", fontSize: "12px" }}>{rec.desc}</p>
                </div>
              </div>

              {/* Mode */}
              <div style={{
                display:        "flex",
                alignItems:     "center",
                gap:            "12px",
                background:     "rgba(0,0,0,0.2)",
                borderRadius:   "10px",
                padding:        "14px",
                marginBottom:   "16px",
              }}>
                <span style={{ fontSize: "32px" }}>{icons[rec.data.name] || "🚗"}</span>
                <span style={{ color: "#fff", fontSize: "20px", fontWeight: "700" }}>
                  {rec.data.name}
                </span>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ color: "#00ff9c", fontWeight: "bold", fontSize: "16px" }}>{rec.data.co2} kg</p>
                  <p style={{ color: "#6b9e8f", fontSize: "11px" }}>CO₂/month</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ color: "#facc15", fontWeight: "bold", fontSize: "16px" }}>₹{rec.data.cost}</p>
                  <p style={{ color: "#6b9e8f", fontSize: "11px" }}>per month</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ color: "#60a5fa", fontWeight: "bold", fontSize: "16px" }}>{rec.data.time} min</p>
                  <p style={{ color: "#6b9e8f", fontSize: "11px" }}>one way</p>
                </div>
              </div>

              {/* Savings vs car */}
              {savings && parseFloat(savings.co2Saved) > 0 && (
                <div style={{
                  background:   "rgba(0,255,156,0.06)",
                  border:       "1px solid rgba(0,255,156,0.15)",
                  borderRadius: "8px",
                  padding:      "10px 14px",
                  fontSize:     "12px",
                  color:        "#9bd1c6",
                }}>
                  vs Petrol Car → saves&nbsp;
                  <strong style={{ color: "#00ff9c" }}>{savings.co2Saved} kg CO₂</strong>
                  &nbsp;+&nbsp;
                  <strong style={{ color: "#facc15" }}>₹{savings.moneySaved}</strong>
                  &nbsp;per month
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}