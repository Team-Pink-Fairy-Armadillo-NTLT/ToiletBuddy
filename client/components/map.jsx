import { useLoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import React from 'react';
import AutocompleteInput from './autocompleteInput.jsx';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from "react-bootstrap";
// import { use } from '../../server/routes/googleAuthRouter.js';


function Map() {
  // const testLocations = [{lat: 45.46000, lng: -122.73000 }, {lat: 45.47, lng:-122.74}, {lat: 45.48, lng: -122.75}];
  // const testMarkers = [];
  const clickMarker = () => {
    console.log(locationID);
    navigate(`/bathroom/${locationID}`);
  }

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        // marker.push(<Marker key={0} position={{lat: position.coords.latitude, lng: position.coords.longitude}} onClick={clickMarker} />);
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setZoom(12);
      },
      () => null
    );
  }, []);

  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, 
    libraries: ["places"],
  });

  const [position, setPosition] = useState({lat: 53.54992, lng: 10.00678});
  const [locationID, setLocationID] = useState(null);
  const [zoom, setZoom] = useState(2);
  const [markerReady, setMarkerReady] = useState(false);
  

  if(!isLoaded) return <div>'Loading...';</div>


  // testLocations.forEach((location, index) => {testMarkers.push(<Marker key={index} position={location} onClick={clickMarker} />);});

  return (
     
    <Container>
      <AutocompleteInput setSelected={setPosition} setLocationID={setLocationID} setMarkerReady={setMarkerReady} setZoom={setZoom} />
      <GoogleMap
        mapContainerStyle={{height:"80%", width:"100%"}}
        center={position}
        zoom={zoom}
      >
        {markerReady && <Marker options={{fillColor: 'blue'}} position={position} onClick={clickMarker} />}
        
      </GoogleMap>
    </Container>
  );
}


export default Map;