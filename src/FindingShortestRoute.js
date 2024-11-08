import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const FindingShortestRoute = () => {
  const [route, setRoute] = useState(null);

  // State for start and end coordinates
  const [start, setStart] = useState([12.9403382,77.5834664]);
  const [end, setEnd] = useState([12.9288889,77.5796064]);

  // State for user input
  const [startInput, setStartInput] = useState({ lat: '', lng: '' });
  const [endInput, setEndInput] = useState({ lat: '', lng: '' });

  // Function to fetch route
  const fetchRoute = async (startCoords, endCoords) => {
    try {
      const response = await fetch(`http://router.project-osrm.org/route/v1/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=full&geometries=geojson`);
      const data = await response.json();

      if (data && data.routes) {
           console.log("data.routes", data.routes )
           setRoute(data.routes[0].geometry.coordinates);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // Fetch the initial route on component mount
  useEffect(() => {
    fetchRoute(start, end);
  }, [start, end]);

  // Handle form submission to update start and end coordinates
  const handleSubmit = (e) => {
    e.preventDefault();
    const newStart = [parseFloat(startInput.lat), parseFloat(startInput.lng)];
    const newEnd = [parseFloat(endInput.lat), parseFloat(endInput.lng)];

    // Validate if input coordinates are valid numbers
    if (!isNaN(newStart[0]) && !isNaN(newStart[1]) && !isNaN(newEnd[0]) && !isNaN(newEnd[1])) {
      setStart(newStart);
      setEnd(newEnd);
      setRoute(null); // Clear previous route
      fetchRoute(newStart, newEnd); // Fetch new route

      
    } else {
      alert("Please enter valid coordinates.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}  style={{ position: "absolute", top: 20, left: 50, background: "white", padding: "1rem", zIndex:999 }}>
        <div>
          <label>Start Latitude: </label>
          <input
            type="text"
            value={startInput.lat}
            onChange={(e) => setStartInput({ ...startInput, lat: e.target.value })}
          />
          <label> Start Longitude: </label>
          <input
            type="text"
            value={startInput.lng}
            onChange={(e) => setStartInput({ ...startInput, lng: e.target.value })}
          />
        </div>
        <div>
          <label>End Latitude: </label>
          <input
            type="text"
            value={endInput.lat}
            onChange={(e) => setEndInput({ ...endInput, lat: e.target.value })}
          />
          <label> End Longitude: </label>
          <input
            type="text"
            value={endInput.lng}
            onChange={(e) => setEndInput({ ...endInput, lng: e.target.value })}
          />
        </div>
        <button type="submit">Find Route</button>
      </form>

      <MapContainer center={start} zoom={14} style={{ height: "100vh", width: "100%",position:"relative"}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {route && <Polyline positions={route.map(coord => [coord[1], coord[0]])} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default FindingShortestRoute;
