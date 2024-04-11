import { useLoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCVxKhnrP-ztbcPPwTYjG3wTnaaVTwJOV4", 
    libraries: ["places"],
  });
  const position = {lat: 53.54992, lng: 10.00678};

  if(!isLoaded) return <div>'Loading...';</div>

  return (
     
    <div style={{height:"100vh", width:"100vw", backgroundColor:"blue"}}>
      <GoogleMap
        mapContainerStyle={{height:"50vh", width:"50%"}}
        center={position}
        zoom={10}
      >

        <Marker position={position} />
      </GoogleMap>
    </div>
    

  );
}


export default App;