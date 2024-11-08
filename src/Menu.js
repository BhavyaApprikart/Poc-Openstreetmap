import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <h1>Map Navigation POC Menu</h1>
      <ul>  
        <li><Link to="/find-shortest-route"> Find Shortest Route </Link></li>
        <li><Link to="/route-based-tracking"> Route - Based Vehicel Tracking</Link></li>
         <hr></hr>
        <li><Link to="/map-with-polyline">Map With Polyline</Link></li>
        <li><Link to="/map-with-shortest-path">Map With Shortest Path</Link></li>
        <li><Link to="/geo-fence-map">Geo Fence Map</Link></li>
        <li><Link to="/route-based-geofence">Route Based GeoFence</Link></li>

      </ul>
    </div>
  );
};

export default Menu;
