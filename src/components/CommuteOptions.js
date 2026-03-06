export default function CommuteOptions({ results }) {

  if (!results || results.length === 0) return null;

  const sorted = [...results].sort((a, b) => parseFloat(a.co2) - parseFloat(b.co2));

  // Top 3 for each category
  const top3Green   = [...results].sort((a, b) => parseFloat(a.co2)  - parseFloat(b.co2)).slice(0, 3);
  const top3Cheap   = [...results].sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost)).slice(0, 3);
  const top3Fast    = [...results].sort((a, b) => parseFloat(a.time) - parseFloat(b.time)).slice(0, 3);

  // Badge logic for full list
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

  return (
    <div style={{ padding: "40px" }}>

      {/* ── TOP 3 SECTION ── */}
      <h2 style={{ marginBottom: "24px" }}>🏆 Top 3 Rankings</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginBottom: "48px",
      }}>

        {/* Top 3 Lowest CO2 */}
        <div style={{
          background: "#0a2e20",
          border: "1px solid #00ff9c44",
          borderRadius: "14px",
          padding: "20px",
        }}>
          <h3 style={{ color: "#00ff9c", marginBottom: "16px", fontSize: "15px" }}>
            🌱 Lowest CO₂/month
          </h3>
          {top3Green.map((m, i) => (
            <div key={m.name} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: i < 2 ? "1px solid #0f3d33" : "none",
            }}>
              <span style={{ color: "#fff", fontSize: "14px" }}>
                <span style={{ color: "#00ff9c", fontWeight: "800", marginRight: "8px" }}>#{i + 1}</span>
                {icons[m.name]} {m.name}
              </span>
              <span style={{ color: "#00ff9c", fontWeight: "bold", fontSize: "14px" }}>
                {m.co2} kg
              </span>
            </div>
          ))}
        </div>

        {/* Top 3 Cheapest */}
        <div style={{
          background: "#2e2800",
          border: "1px solid #facc1544",
          borderRadius: "14px",
          padding: "20px",
        }}>
          <h3 style={{ color: "#facc15", marginBottom: "16px", fontSize: "15px" }}>
            💰 Cheapest/month
          </h3>
          {top3Cheap.map((m, i) => (
            <div key={m.name} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: i < 2 ? "1px solid #3d3200" : "none",
            }}>
              <span style={{ color: "#fff", fontSize: "14px" }}>
                <span style={{ color: "#facc15", fontWeight: "800", marginRight: "8px" }}>#{i + 1}</span>
                {icons[m.name]} {m.name}
              </span>
              <span style={{ color: "#facc15", fontWeight: "bold", fontSize: "14px" }}>
                ₹{m.cost}
              </span>
            </div>
          ))}
        </div>

        {/* Top 3 Fastest */}
        <div style={{
          background: "#0a1f3d",
          border: "1px solid #60a5fa44",
          borderRadius: "14px",
          padding: "20px",
        }}>
          <h3 style={{ color: "#60a5fa", marginBottom: "16px", fontSize: "15px" }}>
            ⚡ Fastest (one way)
          </h3>
          {top3Fast.map((m, i) => (
            <div key={m.name} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: i < 2 ? "1px solid #0f2040" : "none",
            }}>
              <span style={{ color: "#fff", fontSize: "14px" }}>
                <span style={{ color: "#60a5fa", fontWeight: "800", marginRight: "8px" }}>#{i + 1}</span>
                {icons[m.name]} {m.name}
              </span>
              <span style={{ color: "#60a5fa", fontWeight: "bold", fontSize: "14px" }}>
                {m.time} min
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* ── FULL LIST ── */}
      <h2 style={{ marginBottom: "8px" }}>All Commute Options</h2>
      <p style={{ color: "#6b9e8f", marginBottom: "24px", fontSize: "14px" }}>
        Sorted by lowest carbon emissions · Based on your route distance
      </p>

      {sorted.map((mode, index) => {
        const badges    = getBadges(mode.name);
        const isGreenest = mode.name === greenest;

        return (
          <div key={index} style={{
            background:    isGreenest ? "#0a2e20" : "#0f3d33",
            borderRadius:  "12px",
            padding:       "20px 24px",
            marginBottom:  "14px",
            display:       "flex",
            justifyContent:"space-between",
            alignItems:    "center",
            border:        isGreenest ? "1px solid #00ff9c44" : "1px solid transparent",
          }}>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "28px" }}>{icons[mode.name] || "🚗"}</span>
              <div>
                <h3 style={{ color: "#fff", marginBottom: "6px" }}>{mode.name}</h3>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {badges.map((b, i) => (
                    <span key={i} style={{
                      background:   b.bg,
                      color:        b.color,
                      border:       `1px solid ${b.color}44`,
                      borderRadius: "4px",
                      padding:      "2px 10px",
                      fontSize:     "11px",
                      fontWeight:   "bold",
                    }}>
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "32px", textAlign: "center" }}>
              <div>
                <p style={{ color: "#00ff9c", fontWeight: "bold", fontSize: "18px" }}>{mode.co2} kg</p>
                <p style={{ color: "#6b9e8f", fontSize: "12px" }}>CO₂/month</p>
              </div>
              <div>
                <p style={{ color: "#facc15", fontWeight: "bold", fontSize: "18px" }}>₹{mode.cost}</p>
                <p style={{ color: "#6b9e8f", fontSize: "12px" }}>per month</p>
              </div>
              <div>
                <p style={{ color: "#60a5fa", fontWeight: "bold", fontSize: "18px" }}>{mode.time} min</p>
                <p style={{ color: "#6b9e8f", fontSize: "12px" }}>one way</p>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}