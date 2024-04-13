import React, { useEffect, useState } from 'react';
let bathroomReviews = ['test']
import Reviews from './Reviews.jsx';
import { useParams } from 'react-router-dom';
//will be a fetch call to our server which then sends back database query result
const addReview = (placeId) =>{
  console.log(placeId);
    if(document.getElementById('review').value.trim()!==''){
      fetch('/api',{
        method:'POST',
        body:JSON.stringify({
          'review':document.getElementById('review').value,
          'locationId':placeId
        }),
        headers:{'Content-Type':'application/json'},
      })
      console.log(document.getElementById('review').value);
      bathroomReviews.push(document.getElementById('review').value)
      document.getElementById('review').value  = '';
    }
}
const getReviews = async (r,placeId) => {
  const reviews = {
    'BillyBobJoe':'this bathroom sucked',
    'Bob':'This bathroom rocked'
  }
  //const test = await fetch(`/api/${placeId}`).then(data=>data.json());
  for(const [key,val] of Object.entries(reviews)){
    r.push(<Reviews key = {val}  name={key + ': '} review={val}/>);
  }
}
const Bathroom = ()=>{
  let reviews = [];
  const {placeId} = useParams();
  getReviews(reviews,placeId);
  const [placeName, setPlaceName] = useState('');

  useEffect(()=>{
    fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName&key=${process.env.GOOGLE_MAPS_API_KEY}`)
    .then(res => res.json())
    .then(res => { console.log(res); setPlaceName(res.displayName.text)})
    }, [])
  

  return(
    <section id='bathroomSect'>
      {placeName}{/* place holder until we can get place name */}
      <br></br>
      <input id='review' placeholder='Add a review'></input> <button onClick={()=>{addReview(placeId)}}> Submit review</button>
      <div id='bathroomReviews'>
        {reviews}
      </div>
    </section>
  )
}
export default Bathroom;