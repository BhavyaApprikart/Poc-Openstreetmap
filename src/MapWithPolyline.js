import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const MapWithPolyline = () => {
  const path = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.515, -0.12]
  ];

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}                  // Sets maximum zoom level
        errorTileUrl="path/to/error.png"  // Displays a fallback tile on error (optional)
      />
      <Polyline positions={path} color="blue" weight={5} />
    </MapContainer>
  );
};

export default MapWithPolyline;
