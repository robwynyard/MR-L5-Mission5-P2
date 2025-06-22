import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function Map() {
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: -37.787,
    lng: 175.265
  };
  
  const zStations = [
    { lat: -37.78566, lng: 175.25525, name: "Z Hamilton Truck Stop" },
    { lat: -37.78623445926755, lng: 175.25587171528898, name: "Z Frankton" },
    { lat: -37.78420, lng: 175.27230, name: "Z Kahikatea Drive" },
    { lat: -37.77600, lng: 175.25300, name: "Z Pukete" }
  ];

  return (
    <LoadScript googleMapsApiKey="AIzaSyDJ_pyfeSPCNAlLjsPvxi9W5-nGtd8_gt4">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {zStations.map((station, index) => (
          <Marker
            key={index}
            position={{ lat: station.lat, lng: station.lng }}
            title={station.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
