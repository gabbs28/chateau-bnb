import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useModal} from '../../context/Modal';
import moment from 'moment-timezone';

import {FaStar} from "react-icons/fa";
import {TbPointFilled} from "react-icons/tb";

import {getSpotData, getSpotReviewsData} from '../../store/spots';

import PostReview from '../PostReview';
import DeleteReview from "../DeleteReview/";

import './SpotsDetails.css';

import ComingSoon from './comingsoon.jpeg';

function SpotsDetails() {
    const dispatch = useDispatch();
    const {setModalContent} = useModal();

    //allows a component to access any path parameters in its lineage
    const params = useParams();

    //show loading until data is loaded
    const [isLoaded, setIsLoaded] = useState(false);

    //useSelector is similar to useState -> will cause infinite loop     
    //useSelector is used to access data from the store (redux)      
    //const initialState = {spot: {}, allSpots: {}};
    const user = useSelector(state => state.session.user)
    const spot = useSelector(store => store.spots.spot)
    const spotReviews = useSelector(store => store.spots.spotReviews)

    const previewImg = isLoaded ? spot.SpotImages
        .filter((spotImage) => spotImage.preview === true)
        .shift() : {};
    //does the same as top code,  ? is optional chaining
    // let previewImg = spot.SpotImages?.find((spotImage) => spotImage.preview == true);

    const previewSmolImg = isLoaded ? spot.SpotImages
        .filter((spotImage) => spotImage.preview === false)
        .slice(0, 4) : [];

    //Add placeholder images
    while (previewSmolImg.length < 4) {
        previewSmolImg.push({url: ComingSoon})
    }

    const reserve = () => {
        alert('Feature coming soon!')
    }

    const postReview = () => {
        setModalContent(<PostReview spotId={spot.id}/>)
    }

    const deleteReview = (reviewId) => {
        setModalContent(<DeleteReview spotId={spot.id} reviewId={reviewId} />)
    }

    const owner = spot?.ownerId === user?.id;
    const reviewed = spotReviews?.filter(review => review.userId === user?.id).length > 0;

    //useEffect is watching the variables in the [] for changes to break the looping
    //dispatch data to redux to update redux store
    useEffect(() => {
        Promise.all(
            [
                dispatch(getSpotData(params.spotId)),
                dispatch(getSpotReviewsData(params.spotId))
            ]
        ).then(() => setIsLoaded(true))
    }, [dispatch, params.spotId]);

    //const smallImg = spot.SpotImages?.filter((spotImage) => spotImage.previewImage != true)

    //The HTML that makes up the component
    //ternary, first thing is checking is true or false. ? (if) do the expression after the ?. : (else) do this
    return isLoaded ? (
        <div className={'spots-details'}>
            <div>
                <h1>{spot.name}</h1>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            </div>
            <div className={'image-container'}>
                <div className={'image-large'}>
                    <img src={previewImg?.url} alt="img" />
                </div>
                { previewSmolImg.map(
                    spotImage => (
                        <div key={spotImage.id} className={'image-small'}>
                            <img src={spotImage.url} alt="img" />
                        </div>
                    )
                )}
            </div>
            <div className='spot-details'>
                <div className={'left'}>
                    <div className={'host'}>
                        Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
                    </div>
                    <div className={'description'}>
                        {spot.description}
                    </div>
                </div>
                <div className={'right'}>
                    <div className='reserve'>
                        <span>${spot.price.toFixed(2)}</span>
                        <div>
                            {spot.avgStarRating ? (
                                <>
                                    <FaStar />
                                    <span>{spot.avgStarRating.toFixed(1)}</span>
                                    <TbPointFilled />
                                    <span>{spot.numReviews} reviews</span>
                                </>
                            ) : 'New' }
                        </div>
                    </div>
                    <button onClick={reserve}>
                        Reserve
                    </button>
                </div>
            </div>
            <div className='review-details'>
                {spot.avgStarRating ? (
                    <div className={'statistics'}>
                        <FaStar />
                        <span>{spot.avgStarRating.toFixed(1)}</span>
                        <TbPointFilled />
                        <span>
                            {spot.numReviews} reviews
                        </span>
                    </div>
                ) : 'New' }
                <button onClick={postReview} className={'grey'} hidden={owner || reviewed}>
                    Post Your Review
                </button>
            </div>
            <div className='review-container'>
                {spotReviews.map((review) => (
                    <div className='review' key={review.id}>
                        <div className='name'>
                            {review.User.firstName}
                        </div>
                        <div className='date'>
                            {moment(review.createdAt).format("MMMM YYYY")}
                        </div>
                        <div className='description'>
                            {review.review}
                        </div>
                        <button
                            onClick={() => deleteReview(review.id)}
                            className={'grey'}
                            hidden={review.userId !== user?.id}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    ) : (<h1>...loading</h1>) //love this add fun icon
}

export default SpotsDetails;
