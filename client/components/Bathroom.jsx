import React from 'react';
let bathroomReviews = ['test']
import Reviews from './Reviews.jsx';
import { useParams } from 'react-router-dom';
//will be a fetch call to our server which then sends back database query result
const addReview = () =>{
  const {placeId} = useParams();
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
const Bathroom = ()=>{
  return(
    <section id='bathroomSect'>
      Name of bathroom {/* place holder until we can get place name */}
      <br></br>
      <input id='review' placeholder='Add a review'></input> <button onClick={addReview}> Submit review</button>
      <div id='bathroomReviews'>
        <Reviews/>
      </div>
    </section>
  )
}
export default Bathroom;