import React from 'react';
import { Container, Col, Row, FormControl, Form } from 'react-bootstrap';
const RatingSelect = ({name})=>{
    return (
        <Form.Select name={name} id='rating' style={{backgroundColor:'f8f9fa', fontSize:'20px'}}> 
              <option value=''selected disabled>{name} Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </Form.Select>
    )
}
export default RatingSelect;