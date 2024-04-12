// import { usePlacesAutocomplete } from "@react-google-maps/api"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import React from "react";

export default function AutocompleteInput({ setSelected, setLocationID}) {
  console.log('inside AutocompleteInput')
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete();

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSelect = async (address, place_id) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
      setLocationID(place_id);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return(
    <div>
      <input type="text" value={value} onChange={handleChange} placeholder="enter location"/>
      {status === "OK" && data.map(({ place_id, description }) => (
        <div key={place_id} onClick={() => handleSelect(description, place_id)}>
          <p>{description}</p>
        </div>
      ))}

    </div>
    
  )
}