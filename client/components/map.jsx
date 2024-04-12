import { useLoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useState } from 'react';
import React from 'react';
import AutocompleteInput from './autocompleteInput.jsx';


function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, 
    libraries: ["places"],
  });

  const [position, setPosition] = useState({lat: 53.54992, lng: 10.00678});
  const [locationID, setLocationID] = useState(null);
  

  if(!isLoaded) return <div>'Loading...';</div>

  return (
     
    <div style={{height:"100vh", width:"100vw"}}>
      <AutocompleteInput setSelected={setPosition} setLocationID={setLocationID} />
      <GoogleMap
        mapContainerStyle={{height:"50vh", width:"50%"}}
        center={position}
        zoom={10}
      >
        
        <Marker position={position} />
      </GoogleMap>
      {locationID}
    </div>
    

  );
}


export default Map;