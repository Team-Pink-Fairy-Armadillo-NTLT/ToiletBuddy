import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";

export default function EstInfoCard({ locationID, onClickFunc }) {
  // const [establishmentData, setEstablishmentData] = useState(null);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(()=>{
    fetch(`https://places.googleapis.com/v1/places/${locationID}?fields=id,displayName,formattedAddress&key=${process.env.GOOGLE_MAPS_API_KEY}`)
    .then(res => res.json())
    .then(res => {setName(res.displayName.text); setAddress(res.formattedAddress)})
    }, []);

  useEffect(() => {
    fetch(`/api/rating/${locationID}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setAverageRating(res.data)
    })
  }, []);

  useEffect(() => {
    fetch(`/api/image/${locationID}`)
    .then(res => res.json())
    .then(res => {
      console.log('image', res.data);
      setPhoto(res.data)
  })}, []);

  return (
    
      <div className="flex-column" >
        {photo && <img style={{height:'100px', width:'100px', flexGrow:'0'}} src={photo} alt="Establishment" />}

        <h1 >{name}</h1>
        <h2 id="card-address">{address}</h2>
        {averageRating && <div id="card-rating">Average rating: {Number(averageRating).toFixed(1)}</div>}
        {!averageRating && !photo && 
          <h1>Be the first to leave a review!</h1>
        }
        <br />
        <Button onClick={onClickFunc}>Leave a Review</Button>
      </div>
      
  )
}