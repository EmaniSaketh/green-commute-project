import { useState, useRef, useEffect } from "react";
import LOCATIONS from "../utils/locationsData";

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

function LocationInput({ placeholder, value, onChange, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const wrapperRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    if (val.length < 1) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const filtered = LOCATIONS.filter((loc) =>
      loc.name.toLowerCase().startsWith(val.toLowerCase())
    ).slice(0, 8);
    setSuggestions(filtered);
    setShowDropdown(filtered.length > 0);
    setHighlighted(-1);
  };

  const handleSelect = (loc) => {
    onChange(loc.name);
    onSelect(loc);
    setSuggestions([]);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") setHighlighted((prev) => Math.min(prev + 1, suggestions.length - 1));
    else if (e.key === "ArrowUp") setHighlighted((prev) => Math.max(prev - 1, 0));
    else if (e.key === "Enter" && highlighted >= 0) handleSelect(suggestions[highlighted]);
    else if (e.key === "Escape") setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "260px" }}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => value.length > 0 && suggestions.length > 0 && setShowDropdown(true)}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: "8px",
          border: "1px solid #1a4d36",
          background: "#0a2e20",
          color: "#fff",
          fontSize: "15px",
          outline: "none",
          boxSizing: "border-box",
        }}
        autoComplete="off"
      />

      {showDropdown && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 4px)",
          left: 0,
          right: 0,
          background: "#0c3b2d",
          border: "1px solid #1a4d36",
          borderRadius: "8px",
          zIndex: 1000,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}>
          {suggestions.map((loc, i) => (
            <div
              key={loc.name}
              onMouseDown={() => handleSelect(loc)}
              onMouseEnter={() => setHighlighted(i)}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                background: highlighted === i ? "#1a5c40" : "transparent",
                borderBottom: i < suggestions.length - 1 ? "1px solid #0f3d33" : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}>
                📍 {loc.name}
              </span>
              <span style={{
                color: "#6b9e8f",
                fontSize: "11px",
                background: "#0a2e20",
                padding: "2px 8px",
                borderRadius: "4px",
              }}>
                {loc.state}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommuteForm({ onCalculate }) {
  const [originText,     setOriginText]     = useState("");
  const [destText,       setDestText]       = useState("");
  const [originSelected, setOriginSelected] = useState(null);
  const [destSelected,   setDestSelected]   = useState(null);
  const [error,          setError]          = useState("");

  const handleCalculate = () => {
    if (!originSelected || !destSelected) {
      setError("Please select both locations from the dropdown.");
      return;
    }
    if (originSelected.name === destSelected.name) {
      setError("Origin and destination can't be the same place.");
      return;
    }
    setError("");
    const distance = getDistanceKm(
      originSelected.lat, originSelected.lng,
      destSelected.lat,   destSelected.lng
    );
    onCalculate({
      distance,
      origin:      originSelected.name,
      destination: destSelected.name,
      startCoords: [originSelected.lat, originSelected.lng],
      endCoords:   [destSelected.lat,   destSelected.lng],
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "20px" }}>
      <div className="form">
        <LocationInput
          placeholder="📍 Origin (e.g. Hyderabad)"
          value={originText}
          onChange={(val) => { setOriginText(val); setOriginSelected(null); }}
          onSelect={(loc) => setOriginSelected(loc)}
        />
        <LocationInput
          placeholder="🏁 Destination (e.g. Mumbai)"
          value={destText}
          onChange={(val) => { setDestText(val); setDestSelected(null); }}
          onSelect={(loc) => setDestSelected(loc)}
        />
        <button onClick={handleCalculate}>
          ⚡ Calculate My Carbon Cost
        </button>
      </div>

      {error && (
        <p style={{ color: "#ff6b6b", fontSize: "14px", marginTop: "4px" }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}