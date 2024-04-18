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
      console.log(res);
      setPhoto(res.data)
  })}, []);

  return (
    <>
      {photo && <img src={photo} alt="Establishment" />}
      <div>{name}</div>
      <div>{address}</div>
      <div>{averageRating}</div>
      {/* {!averageRating && !photo && 
        <div>Be the first to leave a review!</div>
      } */}
      <Button onClick={onClickFunc}>Leave a Review</Button>

    </>
  )
}