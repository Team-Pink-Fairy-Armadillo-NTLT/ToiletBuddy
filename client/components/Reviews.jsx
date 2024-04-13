import React from 'react';
import { Card } from 'react-bootstrap';


const Reviews = (props)=>{
    return (
            <Card>
                <Card.Header ><span style={{fontSize:'20'}}>{props.rating}</span>/10</Card.Header>
                <Card.Body>
                    <blockquote className='blockquote mb-0'>
                        <p>{props.review}</p>       
                        <footer className='blockquote-footer'>{props.username}</footer>       
                    </blockquote>
                </Card.Body>
            </Card>    
    )
}
export default Reviews;