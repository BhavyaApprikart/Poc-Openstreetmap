import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import * as turf from '@turf/turf';
import L from 'leaflet';
import heavytruck from './images/—Pngtree—loading truck large truck clip_5845955.png'

// Create a custom icon for the vehicle marker
const truckIcon = new L.Icon({
  iconUrl: heavytruck, // Replace with your truck image URL
  iconSize: [82, 78],
  iconAnchor: [8, 16],
});

const RouteBasedGeoFence = () => {
  // Define the path as an array of latitude/longitude coordinates
  const routePath = [
    [12.92884, 77.58587], // Start
    [12.93604, 77.58875], // Waypoint 1
    [12.93941, 77.59343], // Waypoint 2
    [12.93527, 77.60645], // Waypoint 3
    [12.93697, 77.61082], // Waypoint 4
    [12.93520, 77.61406]  // End
  ];
  

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const handlePosition = (position) => {
      const { latitude, longitude } = position.coords;
      const location = [latitude, longitude];
      setUserLocation(location);

      // Check if the user is off-route
      const isOffRoute = checkIfOffRoute(location, routePath);
      if (isOffRoute) {
          alert("You are off the designated route!");
        // if (Notification.permission === 'granted') {
        //   new Notification("Alert", { body: "You have gone off-route!" });
        // }
      }
    };

    const watchId = navigator.geolocation.watchPosition(handlePosition, (error) => {
      console.error("Error fetching location:", error);
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Function to check if the location is within the buffered route corridor
  const checkIfOffRoute = (location, route) => {
    const point = turf.point(location);
    const line = turf.lineString(route);
    const bufferedLine = turf.buffer(line, 0.1, { units: 'kilometers' }); // Adjust buffer distance for corridor width
    return !turf.booleanPointInPolygon(point, bufferedLine);
  };

  return (
    <MapContainer center={routePath[0]} zoom={15} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    
      />

      {/* Render the route path */}
      <Polyline positions={routePath} color="green" width ={500}/>

      {/* Render the user's location as a truck marker */}
      {userLocation && (
        // off route   
        // <Marker position={[12.93604, 77.589]} icon={truckIcon} />           

         //on route
         <Marker position={[12.93604, 77.58875]} icon={truckIcon} /> 

      )}
    </MapContainer>
  );
};

export default RouteBasedGeoFence;
