import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Marker, useMap } from 'react-leaflet';
import * as turf from '@turf/turf';
import L from 'leaflet';
import truct from './images/—Pngtree—green military cargo truck with_15422374.png'

// Create a custom icon for the truck
const truckIcon = new L.Icon({
  iconUrl:  truct, // Replace with your truck image URL
  iconSize: [160, 114], // Adjust the size as needed
  iconAnchor: [16, 32], // Adjust anchor point for accurate placement
});

const GeoFenceMap = () => {
  const geofenceCenter = [12.9401186, 77.5839599];
  const geofenceRadius = 2000; // Radius in meters

  const [userLocation, setUserLocation] = useState(null);

  // Request notification permissions
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const handlePosition = (position) => {
      const { latitude, longitude } = position.coords;
      const location = [latitude, longitude];
      setUserLocation(location);

      // Check if user is outside the geofence
      const isOutside = checkIfOutsideGeofence(location, geofenceCenter, geofenceRadius);
      if (isOutside) {
        alert("You have exited the geofenced area!");
        // if (Notification.permission === 'granted') {
        //   new Notification("Alert", { body: "You have exited the geofenced area!" });
        // }
      }
    };

    const watchId = navigator.geolocation.watchPosition(handlePosition, (error) => {
      console.error("Error fetching user location:", error);
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const checkIfOutsideGeofence = (location, center, radius) => {
    const point = turf.point(location);
    const circle = turf.circle(center, radius / 1000, { units: 'kilometers' });
    return !turf.booleanPointInPolygon(point, circle);
  };

  return (
    <MapContainer center={geofenceCenter} zoom={15} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Draw the geofence circle */}
      <Circle center={geofenceCenter} radius={geofenceRadius} color="blue" />

      {/* Draw the user's current location with a truck icon marker */}
      {userLocation && (
        <Marker  position={[12.9401186, 77.5839599]}   icon={truckIcon} />
      )}
    </MapContainer>
  );
};

export default GeoFenceMap;
