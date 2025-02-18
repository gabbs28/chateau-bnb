import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postReview } from '../../store/reviews';
import { getSpotData, getSpotReviewsData } from '../../store/spots';
import { useModal } from '../../context/Modal';
import ReactStars from "react-rating-stars-component";

import './PostReview.css';

function PostReview({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [review, setReview] = useState(null);
    const [stars, setStars] = useState(null)
    const [errors, setErrors] = useState(
        {
            'review': null,
            'stars': null
        }
    )

    const setters = {
        'review': setReview,
        'stars': setStars
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
            review,
            stars
        }

        const request = postReview(spotId, data)
        request.then(() => Promise.all(
            [
                dispatch(getSpotData(spotId)),
                dispatch(getSpotReviewsData(spotId))
            ]
        ))
            .then(() => closeModal())
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
                <label htmlFor='review'></label>
                <textarea
                    name='review'
                    placeholder='Leave your review here...'
                    value={review}
                    onChange={onInputChange}
                />
                {errors['review'] && (<p className='errors'>{errors['review']}</p>)}
            </div>
            <div className={'stars-container'}>
                <ReactStars
                    count={5}
                    onChange={setStars}
                    value={stars}
                    size={24}
                    activeColor="#ffd700"
                />
            </div>
            <div>
                <button onClick={onSubmit} disabled={ !(review && stars)}>
                    Submit Your Review
                </button>
            </div>
        </div>
    );
}

export default PostReview;
