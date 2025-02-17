import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './PostReview.css';

function PostReview() {
    const [review, setReview] = useState("");

    const [errors, setErrors] = useState(
        {
            'review': null
        }
    )

    const setters = {
        'review': setReview
    }

    const onInputChange = event => {
        //event.target is the HTML element that caused the event
        const name = event.target.name;
        const value = event.target.value;

        //Look up the setter function for the field that just changed
        const setter = setters[name];

        //Invoke the setter function and update the value
        setter(value);

    }

    const onSubmit = () => {
        const valid = validate()
        if (!valid) {
            return
        }


        const data = {
            review
        }

        const request = postReview(data)
        request.then(json => navigate(`/spots/${json.id}`)) //dc with s
            .catch(response => {
                response.json()
                    .then(json => setErrors(json.errors))
            })

    }

    const validate = () => {
        //Make a copy of the current error state
        const current = {}

        if (!review) {
            current.review = "Review is required."
        }
        setErrors(current)

        return Object.keys(current).length === 0


    }

    //The HTML that makes up the component
    return (
        <div className={'post-review'}>
            <h1>How was your stay?</h1>
            <div className='field'>
                <label htmlFor='review'>Country</label>
                <input
                    name='review'
                    type='text'
                    placeholder='Leave your review here...'
                    value={review}
                    onChange={onInputChange}
                />
                {errors['review'] && (<p className='errors'>{errors['review']}</p>)}
            </div>
            <div>
                {"need stars here"}
            </div>
            <div>
                <button onClick={onSubmit}>
                    Submit Your Review
                </button>
            </div>
        </div>
    );
}

export default PostReview;
