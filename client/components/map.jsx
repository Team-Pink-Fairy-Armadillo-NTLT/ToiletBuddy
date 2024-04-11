import { useLoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import AutocompleteInput from './autocomplete-input';


function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, 
    libraries: ["places"],
  });

  const [position, setPosition] = useState({lat: 53.54992, lng: 10.00678});
  

  if(!isLoaded) return <div>'Loading...';</div>

  return (
     
    <div style={{height:"100vh", width:"100vw", backgroundColor:"blue"}}>
      <AutocompleteInput setSelected={setPosition} />
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