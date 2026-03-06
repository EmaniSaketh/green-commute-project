import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

// Calculate zoom level based on distance
function getZoom(distanceKm) {
  if (distanceKm < 2)  return 14;
  if (distanceKm < 5)  return 13;
  if (distanceKm < 15) return 12;
  if (distanceKm < 40) return 11;
  if (distanceKm < 100) return 10;
  return 8;
}

// Get midpoint to center the map between origin and destination
function getMidpoint(start, end) {
  return [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
  ];
}

export default function Map({ start, end, distance }) {

  if (!start || !end) return null;

  const center = getMidpoint(start, end);
  const zoom   = getZoom(distance || 10);

  return (
    <div style={{ margin: "40px", borderRadius: "12px", overflow: "hidden" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "380px", width: "100%" }}
        key={`${start}-${end}`}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />

        <Marker position={start}>
          <Popup>📍 Origin</Popup>
        </Marker>

        <Marker position={end}>
          <Popup>🏁 Destination</Popup>
        </Marker>

        <Polyline
          positions={[start, end]}
          color="#00ff9c"
          weight={3}
          dashArray="8 6"
        />

      </MapContainer>
    </div>
  );
}
