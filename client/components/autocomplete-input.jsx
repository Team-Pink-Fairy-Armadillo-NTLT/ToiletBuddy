import { usePlacesAutocomplete } from "react-places-autocomplete";

export default function AutocompleteInput({ setSelected }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return(
    <div>
      

    </div>
    
  )
}