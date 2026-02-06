import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { locationsMap } from '../Utils/location';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const TrafficMap = ({ incidents }) => {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      <MapContainer 
        center={[-1.2921, 36.8219]} 
        zoom={12} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {incidents.map((incident) => {
          // Find coordinate based on location name string
          // If name doesn't match exactly, fallback to slightly randomized CBD location
          const coords = locationsMap[Object.keys(locationsMap).find(k => incident.location.includes(k))] 
                         || { lat: -1.2921 + (Math.random() * 0.02), lng: 36.8219 + (Math.random() * 0.02) };

          return (
            <Marker key={incident._id} position={[coords.lat, coords.lng]}>
              <Popup>
                <div className="text-center">
                  <strong className="text-red-600 uppercase">{incident.type}</strong> <br />
                  {incident.location} <br />
                  <span className="text-xs font-bold text-gray-500">{new Date(incident.timestamp).toLocaleTimeString()}</span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default TrafficMap;