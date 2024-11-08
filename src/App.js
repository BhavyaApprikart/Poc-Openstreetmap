import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import GeoFenceMap from './GeoFenceMap';
import MapWithPolyline from './MapWithPolyline';
import MapWithShortestPath from './MapWithShortestPath';
import RouteBasedGeoFence from './RouteBasedGeoFence';
import RouteBasedTracking from './RouteBasedTracking';
import FindingShortestRoute from './FindingShortestRoute'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Menu />} /> 
          <Route path="/map-with-polyline" element={<MapWithPolyline />} />
          <Route path="/find-shortest-route" element={<FindingShortestRoute />} />
          <Route path="/map-with-shortest-path" element={<MapWithShortestPath />} />
          <Route path="/geo-fence-map" element={<GeoFenceMap />} />
          <Route path="/route-based-geofence" element={<RouteBasedGeoFence />} />
          <Route path="/route-based-tracking" element={<RouteBasedTracking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
