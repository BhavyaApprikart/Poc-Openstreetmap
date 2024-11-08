import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const MapWithShortestPath = () => {
  const [route, setRoute] = useState(null);

  // Start and end points (replace with your desired coordinates)
  const start = [ 13.69819605, 77.32817566 ];
  const end = [ 19.47008629,84.36747506 ];

//19°37'27"N 83°29'33"E
//19.62443948,83.49251863

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        // Call the OSRM API
        const response = await fetch(`http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`);
        const data = await response.json();
        
        if (data && data.routes) {
          // Set the route geometry
          setRoute(data.routes[0].geometry.coordinates);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [start, end]);

  return (
    <MapContainer center={start} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {route && <Polyline positions={route.map(coord => [coord[1], coord[0]])} color="blue" />}
    </MapContainer>
  );
};

export default MapWithShortestPath;
