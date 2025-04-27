
// components/MapModal.js
// import React from 'react';
// import '../styles/Modal.css';

// const MapModal = ({ location, coordinates, onClose }) => {
//   return (
//     <div className="modal-backdrop">
//       <div className="modal-content map-modal">
//         <div className="modal-header">
//           <h3>{location}</h3>
//           <button className="close-btn" onClick={onClose}>×</button>
//         </div>
        
//         <div className="map-container">
//           {/* In a real application, you would integrate with Google Maps or another mapping service */}
//           {/* For this example, we'll use a placeholder */}
//           <div className="map-placeholder">
//             <div className="map-info">
//               <p><strong>Location:</strong> {location}</p>
//               <p><strong>Coordinates:</strong> {coordinates.lat}, {coordinates.lng}</p>
//             </div>
//             {/* <Map/> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MapModal;


import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/Modal.css';

// 🛠️ Fix Leaflet's missing icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapModal = ({ location, coordinates, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content map-modal">
        <div className="modal-header">
          <h3>{location}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="map-container">
          <div className="map-placeholder">
            <MapContainer
              center={[coordinates.lat, coordinates.lng]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <Marker position={[coordinates.lat, coordinates.lng]} />
            </MapContainer>
          </div>

          {/* Info box (unchanged) */}
          <div className="map-info" style={{ marginTop: '1rem' }}>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Coordinates:</strong> {coordinates.lat}, {coordinates.lng}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
