import { useState } from "react";
import axios from "axios";

// Haversine formula — calculates real distance between two lat/lng points
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function CommuteForm({ onCalculate }) {

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getCoordinates = async (place) => {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
    );
    if (!res.data || res.data.length === 0) {
      throw new Error(`Location not found: "${place}"`);
    }
    return [parseFloat(res.data[0].lat), parseFloat(res.data[0].lon)];
  };

  const handleSubmit = async () => {
    if (!origin || !destination) {
      setError("Please enter both origin and destination.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const startCoords = await getCoordinates(origin);
      const endCoords = await getCoordinates(destination);

      // Auto-calculate distance — no manual input needed
      const distance = getDistanceKm(
        startCoords[0], startCoords[1],
        endCoords[0],   endCoords[1]
      );

      if (distance < 0.1) {
        setError("Origin and destination seem to be the same place.");
        setLoading(false);
        return;
      }

      onCalculate({ distance, origin, destination, startCoords, endCoords });

    } catch (err) {
      setError(err.message || "Could not find location. Try being more specific.");
    }

    setLoading(false);
  };

  return (
    <div className="form">

      <input
        placeholder="📍 Origin (e.g. Secunderabad)"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />

      <input
        placeholder="🏁 Destination (e.g. Hitech City)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "⏳ Calculating..." : "⚡ Calculate My Carbon Cost"}
      </button>

      {error && (
        <p style={{ color: "#ff6b6b", textAlign: "center", width: "100%", marginTop: "10px" }}>
          ⚠️ {error}
        </p>
      )}

    </div>
  );
}
