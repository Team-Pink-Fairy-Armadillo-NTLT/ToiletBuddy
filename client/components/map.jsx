import { useLoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import React from 'react';
import AutocompleteInput from './autocompleteInput.jsx';
import { useNavigate } from 'react-router-dom';
// import { use } from '../../server/routes/googleAuthRouter.js';


function Map() {
  // const currentLocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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

  return (
     
    <div style={{height:"100vh", width:"100vw"}}>
      <AutocompleteInput setSelected={setPosition} setLocationID={setLocationID} />
      <GoogleMap
        mapContainerStyle={{height:"50vh", width:"50%"}}
        center={position}
        zoom={10}
      >
        
        <Marker position={position} onClick={clickMarker} />
      </GoogleMap>
    </div>
    

  );
}


export default Map;