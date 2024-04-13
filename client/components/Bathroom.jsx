import React, { useEffect, useState } from 'react';
import Reviews from './Reviews.jsx';
import { useParams } from 'react-router-dom';
//will be a fetch call to our server which then sends back database query result
const Bathroom = ()=>{
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
        document.getElementById('review').value  = '';
      }
  }

  const getReviews = (updateReviews,placeId,reviews) => {
    let r = [];
    const data = fetch(`/api/${placeId}`).then(data=>data.json()).then(data=>{
      console.log(data['data'].length);
      if(data['data'].length!==0){
        for(const val of Object.values(data)[0]){
          r.push(
          <Reviews 
          key = {val['review_text']} 
          id = {val['_id']} 
          rating = {val['rating']} 
          review={val['review_text']} 
          username={val['username']}
          />);
        }
        updateReviews(r);
      }
    })
  }

  const {placeId} = useParams();
  const [placeName, setPlaceName] = useState('');
  const [reviews,updateReviews]  = useState([]);

  useEffect(()=>{
    fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName&key=${process.env.GOOGLE_MAPS_API_KEY}`)
    .then(res => res.json())
    .then(res => { console.log(res); setPlaceName(res.displayName.text)})

    getReviews(updateReviews,placeId,reviews);
    }, [])

  return(
    <section id='bathroomSect'>
      {placeName}
      <br></br>
      <input id='review' placeholder='Add a review'></input> <button onClick={()=>{addReview(placeId)}}> Submit review</button>
      <div id='bathroomReviews'>
        {reviews}
      </div>
    </section>
  )
}
export default Bathroom;