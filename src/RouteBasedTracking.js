import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import * as turf from '@turf/turf';
import L from 'leaflet';
import heavytruck from './images/—Pngtree—loading truck large truck clip_5845955.png'


const truckIcon = new L.Icon({
  iconUrl: heavytruck, 
  iconSize: [82, 78],
  iconAnchor: [8, 16],
});

const RouteBasedTracking = () => {
  // Define the route path with latitude/longitude coordinates

  const routePath = [
    [12.94031, 77.583465],
    [12.940323, 77.582824],
    [12.939838, 77.58282],
    [12.939372, 77.582817],
    [12.938911, 77.582802],
    [12.938354, 77.582773],
    [12.937927, 77.582757],
    [12.937458, 77.582726],
    [12.936785, 77.582702],
    [12.936734, 77.5827],
    [12.936618, 77.582702],
    [12.936662, 77.581294],
    [12.936665, 77.58119],
    [12.936679, 77.580396],
    [12.936684, 77.580131],
    [12.936626, 77.580129],
    [12.936578, 77.580131],
    [12.936361, 77.580135],
    [12.933691, 77.580162],
    [12.933047, 77.580168],
    [12.932972, 77.58017],
    [12.932708, 77.580178],
    [12.932307, 77.580189],
    [12.932134, 77.580192],
    [12.931657, 77.580185],
    [12.930905, 77.580197],
    [12.930864, 77.580198],
    [12.930771, 77.580199],
    [12.930773, 77.58007],
    [12.930779, 77.579659],
    [12.930779, 77.579653],
    [12.930741, 77.579653],
    [12.930722, 77.579653],
    [12.930063, 77.579667],
    [12.92959, 77.579673],
    [12.928892, 77.579694]
  ];
  

  // State to store vehicle's current location
  const [vehicleLocation, setVehicleLocation] = useState(routePath[0]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Function to check if the vehicle is off the designated route
  const checkIfOffRoute = (location, route) => {
    const point = turf.point(location);
    const line = turf.lineString(route);
    const bufferedLine = turf.buffer(line, 0.05, { units: 'kilometers' }); // Buffer defines corridor width
    return !turf.booleanPointInPolygon(point, bufferedLine);
  };

  // Handle user input to update vehicle location
  const handleSubmit = (e) => {
    e.preventDefault();

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const newLocation = [lat, lon];

    setVehicleLocation(newLocation); // Update the vehicle location on the map

    // Check if the new location is off-route
    const isOffRoute = checkIfOffRoute(newLocation, routePath);
    if (isOffRoute) {
      alert("Vehicle is off-route!");
    } else {
      alert("Vehicle is on-route.");
    }
  };

  return (
    <div>
      <MapContainer center={routePath[0]} zoom={14} style={{ height: "100vh", width: "100%",position:"relative" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Display the defined route as a polyline */}
        <Polyline positions={routePath} color="blue" />

        {/* Display the vehicle's current location as a marker */}
        <Marker position={vehicleLocation} icon={truckIcon} />
      </MapContainer>

      {/* Form to input latitude and longitude */}
      <form onSubmit={handleSubmit} style={{ position: "absolute", top: 20, left: 50, background: "white", padding: "1rem", zIndex:999 }}>
        <label>
          Latitude:
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter latitude"
            required
            step="0.00001"
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter longitude"
            required
            step="0.00001"
          />
        </label>
        <br />
        <button type="submit">Update Location</button>
      </form>
    </div>
  );
};

export default RouteBasedTracking;
