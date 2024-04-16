import { Marker } from "@react-google-maps/api"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

export default function AutocompleteInput({ setSelected, setLocationID, setMarkerReady}) {
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
      setMarkerReady(true);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return(
    <div>
      <InputGroup style={{marginBottom: '5px', marginTop: '5px'}}>
        <InputGroup.Text>Find an Establishment</InputGroup.Text>
        <FormControl
          value={value}
          onChange={handleChange}
          placeholder="Enter location"/>
      </InputGroup>
      {status === "OK" && data.map((/*{ place_id, description }*/datum) => {
        console.log(datum)
        return (
        <div key={datum.place_id} onClick={() => handleSelect(datum.description, datum.place_id)}>
          <p>{datum.description}</p>
        </div>
      )})}

    </div>
    
  )
}