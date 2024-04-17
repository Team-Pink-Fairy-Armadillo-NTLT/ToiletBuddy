import React from 'react';
import { Card } from 'react-bootstrap';


const Reviews = (props)=>{
    console.log(props)
    return (
            <Card className='m-2 '>
                <Card.Header ><span style={{fontSize: "30"}}>{props.rating}</span>/10</Card.Header>
                <Card.Body>
                    <blockquote className='blockquote mb-0'>
                        <p>{props.review}</p> 
                        <img src={props.reviewImage}/>      
                        <footer className='blockquote-footer'>{props.username}</footer>       
                    </blockquote>
                </Card.Body>
            </Card>    
    )
}
export default Reviews;