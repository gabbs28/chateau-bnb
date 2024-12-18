import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SpotsDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotData } from '../../store/spots';

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

    //useEffect is watching the variables in the [] for changes to break the looping
    //dispatch data to redux to update redux store
    useEffect(() => {
        dispatch(getSpotData(params.spotId))
            .then(() => setIsLoaded(true))
    }, [dispatch, params.spotId]);

    //? optional chaining
    const largeImg = params.spotId.SpotImages?.find((spotImage) => spotImage.previewImage == true)

    console.log("LargeImg", largeImg)

    const smallImg = spot.SpotImages?.filter((spotImage) => spotImage.previewImage != true)

    //The HTML that makes up the component
    return isLoaded ? ( 
        <div className={'spots-details'}>
            <h1>{spot.name}</h1>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            <div>
               {spot.largeImg}
            </div>

        </div>
    ) : (<h1>...loading</h1>) //love this add fun icon
}

export default SpotsDetails;
