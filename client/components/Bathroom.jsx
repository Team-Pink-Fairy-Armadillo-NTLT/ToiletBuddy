import React, { useEffect, useState } from 'react';
import Reviews from './Reviews.jsx';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser} from '../slice.js'
import { Container, Col, Row, FormControl, Form } from 'react-bootstrap';
import RatingSelect from './RatingSelect.jsx';
//will be a fetch call to our server which then sends back database query result

const Bathroom = ()=>{
  const {placeId} = useParams();
  const [placeName, setPlaceName] = useState('');
  const [reviews,updateReviews]  = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [address, setAddress] = useState('');
  const [imageFile, setImageFile] = useState();
  const isLoggedIn = useSelector(state => state.bathroom.isLoggedIn);
  const dispatch = useDispatch();

  const getFileContents =  file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  })
  
  
  const addReview = async (e) =>{
    e.preventDefault();
    let review = e.target.text.value;
    let bathroom = e.target['bathroom(required)'].value;
    let toilet = e.target.toilet.value;
    let sink = e.target.sink.value;
    let smell = e.target.smell.value;
    let cleanliness = e.target.cleanliness.value;
    let TP = e.target.TP.value;

    //setFile(URL.createObjectURL(e.target.imageFile[0]));
    //let reader = new FileReader();
    let image;
    if(imageFile){
      image = await getFileContents(imageFile)
    }
    else {
      image = null
    }

    if(toilet === '') toilet = null;
    if(sink === '') sink = null;
    if(smell === '') smell = null;
    if(cleanliness === '') cleanliness = null;
    if(TP === '') TP = null;
    if(review.trim()===''){
      alert('Enter a review');
    }else if(bathroom===''){
      alert('Select a bathroom rating');
    }else if(bathroom>10 || bathroom<0){
      alert('Please keep your rating between 1 and 10');
    }else{
      console.log('t',toilet);
      console.log('sink',sink);
      console.log('smell',smell);
      console.log('cleanliness',cleanliness);
      console.log('TP',TP);
      console.log('image', image)
        fetch(`/api/${placeId}`,{
          method:'POST',
          body:JSON.stringify({
            'text':review,
            'rating':bathroom,
            'toilet':toilet,
            'sink':sink,
            'smell':smell,
            'cleanliness':cleanliness,
            'tp':TP,
            'address':address,
            'name': placeName,
            'image': image
          }),
          headers:{'Content-Type':'application/json'},
        })
        .then(res=> {console.log('testing res',res); return res})
        .then(res=>{
          console.log('res',res);
          if(res.status===403){alert('Please log in to post review');
          console.log('did I make it here?')
          return res}})
        .then(res=>getReviews());
        e.target.text.value  = '';
        e.target['bathroom(required)'].value = '';
        e.target.toilet.value = '';
        e.target.sink.value = '';
        e.target.smell.value = '';
        e.target.cleanliness.value = '';
        e.target.TP.value = '';

    }
  }

  const getReviews = () => {
    let r = [];
    let ratingTotal = 0;
    fetch(`/api/${placeId}`).then(data=>data.json()).then(response=>{
      console.log('response',response)
      if(response['data'].length!==0){
        let i = 0
        for(const review of response['data']){
          ratingTotal += parseFloat(review['rating']);
          r.push(
          <Reviews 
          key = {i} 
          rating = {review['rating']} 
          review={review['text']} 
          username={review['username']}
          />);
          i++
        }
        updateReviews(r);
        setAverageRating((ratingTotal/r.length).toFixed(1));
      }
    })
  }

    async function handleChange(e) {
        console.log(e.target.files);
        console.log(e.target.files[0])
        setImageFile(e.target.files[0]);
        // const buffer = await e.target.files[0].arrayBuffer();
        // let byteArray = new Int8Array(buffer);
        //console.log(byteArray)
    }

  useEffect(()=>{
    fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,formattedAddress&key=${process.env.GOOGLE_MAPS_API_KEY}`)
    .then(res => res.json())
    .then(res => {setPlaceName(res.displayName.text); setAddress(res.formattedAddress)})

    getReviews(updateReviews,placeId);
    }, [])

  return(
    <>
      <h1 style={{textAlign:'center', fontSize: "50"}}>{placeName}: <span style={{fontSize:'30'}}>Average Rating: {averageRating}</span></h1>
      <h2 style={{textAlign:'center', fontSize: "20"}}>{address}</h2>
      <div style={{display:'flex', flexDirection:'row'}}>
        <Container style={{flex: '0 0 30%'}} id='bathroomSect'>
          <form id='form' onSubmit={(e)=>{addReview(e)}}>
            <FormControl name='text' id='review' placeholder='Add a review' as='textarea' rows={5}></FormControl>
            {/* <FormControl name='num' id='rating' type='number'></FormControl> */}
            <RatingSelect name='bathroom(required)'/>
            <RatingSelect name='toilet'/>
            <RatingSelect name='sink'/>
            <RatingSelect name='smell'/>
            <RatingSelect name='cleanliness'/>
            <RatingSelect name='TP'/>
            <input type='submit' value='Submit review'></input>
            <h2>Add Image:</h2>
            <input type="file" name="imageFile" onChange={handleChange} />
          </form>
        </Container>
        <Container style={{flex: '0 0 70%', paddingRight:'40px'}} id='bathroomReviews'>
          {/* <Col> */}
            {/* <Row xs={2} md={3} lg={4} xl={5}> */}
            <Row>
              {reviews}
            </Row>
          {/* </Col> */}
        </Container>
      </div>
    </>
  )
}
export default Bathroom;