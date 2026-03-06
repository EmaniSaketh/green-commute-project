export default function CommuteOptions({ results }) {

  if (!results || results.length === 0) return null;

  const sorted = [...results].sort((a, b) => parseFloat(a.co2) - parseFloat(b.co2));

  // Find best in each category
  const greenest = sorted[0].name;
  const cheapest = [...results].sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost))[0].name;
  const fastest  = [...results].sort((a, b) => parseFloat(a.time) - parseFloat(b.time))[0].name;

  const getBadges = (name) => {
    const badges = [];
    if (name === greenest) badges.push({ label: "🌱 Greenest", color: "#00ff9c", bg: "#0a3d25" });
    if (name === cheapest) badges.push({ label: "💰 Cheapest", color: "#facc15", bg: "#3d3200" });
    if (name === fastest)  badges.push({ label: "⚡ Fastest",  color: "#60a5fa", bg: "#0a1f3d" });
    return badges;
  };

  // Mode icons
  const icons = {
    "Walking":     "🚶",
    "Bicycle":     "🚲",
    "E-Scooter":   "🛴",
    "Metro Rail":  "🚇",
    "EV Car":      "⚡",
    "City Bus":    "🚌",
    "Shared Cab":  "🚕",
    "Petrol Bike": "🏍️",
    "CNG Car":     "🚗",
    "Diesel Car":  "🚗",
    "Petrol Car":  "🚗",
  };

  return (
    <div style={{ padding: "40px" }}>

      <h2 style={{ marginBottom: "8px" }}>All Commute Options</h2>
      <p style={{ color: "#6b9e8f", marginBottom: "24px", fontSize: "14px" }}>
        Sorted by lowest carbon emissions · Based on your route distance
      </p>

      {sorted.map((mode, index) => {
        const badges = getBadges(mode.name);
        const isGreenest = mode.name === greenest;

        return (
          <div
            key={index}
            style={{
              background: isGreenest ? "#0a2e20" : "#0f3d33",
              borderRadius: "12px",
              padding: "20px 24px",
              marginBottom: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: isGreenest ? "1px solid #00ff9c44" : "1px solid transparent",
              transition: "all 0.2s",
            }}
          >

            {/* Left: name + badges */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "28px" }}>{icons[mode.name] || "🚗"}</span>
              <div>
                <h3 style={{ color: "#fff", marginBottom: "6px" }}>{mode.name}</h3>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {badges.map((b, i) => (
                    <span
                      key={i}
                      style={{
                        background: b.bg,
                        color: b.color,
                        border: `1px solid ${b.color}44`,
                        borderRadius: "4px",
                        padding: "2px 10px",
                        fontSize: "11px",
                        fontWeight: "bold",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: stats */}
            <div style={{ display: "flex", gap: "32px", textAlign: "center" }}>
              <div>
                <p style={{ color: "#00ff9c", fontWeight: "bold", fontSize: "18px" }}>
                  {mode.co2} kg
                </p>
                <p style={{ color: "#6b9e8f", fontSize: "12px" }}>CO₂/month</p>
              </div>
              <div>
                <p style={{ color: "#facc15", fontWeight: "bold", fontSize: "18px" }}>
                  ₹{mode.cost}
                </p>
                <p style={{ color: "#6b9e8f", fontSize: "12px" }}>per month</p>
              </div>
              <div>
                <p style={{ color: "#60a5fa", fontWeight: "bold", fontSize: "18px" }}>
                  {mode.time} min
                </p>
                <p style={{ color: "#6b9e8f", fontSize: "12px" }}>one way</p>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
