import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { getAuth } from "firebase/auth";

// Default icon fix for Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function MapView() {
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const handleClick = (e) => {
    if (!pointA) {
      setPointA(e.latlng);
    } else if (!pointB) {
      setPointB(e.latlng);
    } else {
      setPointA(e.latlng);
      setPointB(null);
      setRoute(null);
    }
  };

  const getRoute = async () => {
    if (!pointA || !pointB) return;

    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/route`,
        {
          pointA: [pointA.lng, pointA.lat],
          pointB: [pointB.lng, pointB.lat],
          criteria: "distance", // or "time"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data;
      setRoute(data.coordinates.map((c) => [c[1], c[0]]));
      setDistance((data.distance / 1000).toFixed(2)); // km
      setDuration((data.duration / 60).toFixed(2)); // minutes
    } catch (err) {
      alert("Error fetching route: " + err.message);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[13.0827, 80.2707]} // default Chennai
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        onClick={handleClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {pointA && <Marker position={pointA}><Popup>Point A</Popup></Marker>}
        {pointB && <Marker position={pointB}><Popup>Point B</Popup></Marker>}
        {route && <Polyline positions={route} color="blue" />}
      </MapContainer>

      <div style={styles.controls}>
        <button onClick={getRoute} style={styles.button}>
          Draw Optimized Route
        </button>
        {distance && duration && (
          <p>Distance: {distance} km | Time: {duration} mins</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  controls: {
    position: "absolute",
    top: 10,
    left: 10,
    background: "white",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  },
  button: {
    padding: "0.5rem",
    fontSize: "1rem",
    background: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
