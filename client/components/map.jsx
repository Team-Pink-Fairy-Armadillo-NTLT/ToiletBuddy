import { useLoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import React from 'react';
import AutocompleteInput from './autocompleteInput.jsx';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from "react-bootstrap";
// import { use } from '../../server/routes/googleAuthRouter.js';


function Map() {
  const testLocations = [{lat: 45.46000, lng: -122.73000 }, {lat: 45.47, lng:-122.74}, {lat: 45.48, lng: -122.75}];
  const testMarkers = [];
  

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude)
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
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
  

  if(!isLoaded) return <div>'Loading...';</div>



  const clickMarker = () => {
    console.log(locationID);
    navigate(`/bathroom/${locationID}`);
  }

  testLocations.forEach((location, index) => {testMarkers.push(<Marker key={index} position={location} onClick={clickMarker} />);});

  return (
     
    <Container>
      <AutocompleteInput setSelected={setPosition} setLocationID={setLocationID} />
      <GoogleMap
        mapContainerStyle={{height:"100%", width:"100%"}}
        center={position}
        zoom={12}
      >
        <Marker options={{fillColor: 'blue'}} position={position} onClick={clickMarker} />
        
        {testMarkers}
      </GoogleMap>
    </Container>
  );
}


export default Map;