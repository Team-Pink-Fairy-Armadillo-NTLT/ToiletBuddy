import React, { useEffect, useState } from 'react';
import Reviews from './Reviews.jsx';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser} from '../slice.js'
//will be a fetch call to our server which then sends back database query result
const Bathroom = ()=>{
  const {placeId} = useParams();
  const [placeName, setPlaceName] = useState('');
  const [reviews,updateReviews]  = useState([]);
  const isLoggedIn = useSelector(state => state.bathroom.isLoggedIn);
  const dispatch = useDispatch();
  const addReview = (e) =>{
    e.preventDefault();
      if(document.getElementById('review').value.trim()!=='' && document.getElementById('rating').value!==''){
        fetch(`/api/${placeId}`,{
          method:'POST',
          body:JSON.stringify({
            'text':e.target.text.value,
            'rating':e.target.num.value
          }),
          headers:{'Content-Type':'application/json'},
        }).then(res=>{
          if(res.status===403){alert('Please log in to post review')}}).then(res=>getReviews());
        document.getElementById('review').value  = '';
        document.getElementById('rating').value = '';
      }
  }

  const getReviews = () => {
    let r = [];
    fetch(`/api/${placeId}`).then(data=>data.json()).then(response=>{
      if(response['data'].length!==0){
        for(const review of Object.values(response)[0]){
          r.push(
          <Reviews 
          key = {review['review_text']} 
          rating = {review['rating']} 
          review={review['review_text']} 
          username={review['username']}
          />);
        }
        updateReviews(r);
      }
    })
  }


  useEffect(()=>{
    fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName&key=${process.env.GOOGLE_MAPS_API_KEY}`)
    .then(res => res.json())
    .then(res => setPlaceName(res.displayName.text))

    getReviews(updateReviews,placeId);
    }, [])

  return(
    <section id='bathroomSect'>
      <h1>{placeName}</h1>
      <br></br>
      <form id='form' onSubmit={(e)=>{addReview(e)}}>
        <input name='text' id='review' placeholder='Add a review'></input>
        <input name='num' id='rating' type='number'></input>
        <input type="submit" value="Submit" />
      </form>
      <div id='bathroomReviews'>
        {reviews}
      </div>
    </section>
  )
}
export default Bathroom;