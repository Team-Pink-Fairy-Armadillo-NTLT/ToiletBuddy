import React from 'react';
let bathroomReviews = ['test']
import Reviews from './Reviews.jsx';
//will be a fetch call to our server which then sends back database query result
const addReview = () =>{
    if(document.getElementById('review').value.trim()!==''){
      // fetch('/bathroom',{
      //   method:'POST',
      //   body:document.getElementById('review').value,
      //   headers:{'Content-Type':'application/json'},
      // })
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