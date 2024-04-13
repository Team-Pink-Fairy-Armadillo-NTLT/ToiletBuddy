import React from 'react'
const Reviews = (props)=>{
    return (
        <section id = 'reviewSect'>
            <div>
            {props.username + ': '}<br/>{props.review} <br/>Rating:  {props.rating}
            </div>
        </section>
    )
}
export default Reviews;