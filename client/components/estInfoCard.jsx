import React from "react";

export default function EstInfoCard({ name, address, avgRating, photo }) {

  return (
    <>
      <img src={photo} alt="Establishment" />
      <div>{name}</div>
      <div>{address}</div>
      <div>{avgRating}</div>
    </>
  )
}