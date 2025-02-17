import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';

import { getSpotData, getSpotReviewsData } from '../../store/spots';

import './SpotsDetails.css';

function SpotsDetails() {
    const dispatch = useDispatch();

    //allows a component to access any path parameters in its lineage
    const params = useParams();

    //show loading until data is loaded
    const [isLoaded, setIsLoaded] = useState(false);

    //useSelector is similar to useState -> will cause infinite loop     
    //useSelector is used to access data from the store (redux)      
    //const initialState = {spot: {}, allSpots: {}};
    const spot = useSelector(store => store.spots.spot)
    const spotReviews = useSelector(store => store.spots.spotReviews)
    console.log("This is spotReviews", spotReviews)
  

    const previewImg = isLoaded ? spot.SpotImages
        .filter((spotImage) => spotImage.preview == true)
        .shift() : {};
    //does the same as top code,  ? is optional chaining
    // let previewImg = spot.SpotImages?.find((spotImage) => spotImage.preview == true);

    const previewSmolImg = isLoaded ? spot.SpotImages
        .filter((spotImage) => spotImage.preview == false)
        .slice(0, 4) : [];


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
            <div className={'img-container'}>
                <div>
                    <img src={previewImg?.url} className={"Large-img"} alt="IMG" width="560" height="371" />
                </div>
                <div>
                    {previewSmolImg.map(spotImage => <img key={spotImage.id} src={spotImage.url} className={"Small-img"} alt="IMG" width="277" height="183.69" />)}
                </div>
            </div>
            <div className={'host'}>
                Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
            </div>
            <div className={'desc-reserve'} width="654" height="144">
                <p>
                    {spot.description}
                </p>
                <table className={'table-box'}>
                    <tbody>
                        <tr>
                            <td>${spot.price} night</td>
                            <td>{spot.avgStarRating ?? 'New'}{/*make rating display stars*/}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button className={'Reserve'}>
                                    Reserve
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div className='review-container-title'>
                    {spot.avgStarRating ?? 'New'}{/*make rating display stars*/}
                </div>
                <button className={'Post-Your-Review'}>
                    Post Your Review
                </button>
            </div>
            <div className='review-container'>
                {spotReviews.map((review) => (
                    <div className='review-tile'>
                        <div className='review-name'>
                            {review.User.firstName}
                        </div>
                        <div className='review-date'>
                            {moment(review.createdAt).format("MMMM YYYY")}
                        </div>
                        <div className='review-description'>
                            {review.review}
                        </div>
                    </div>
                ))}
            </div>


        </div>
    ) : (<h1>...loading</h1>) //love this add fun icon
}

export default SpotsDetails;
