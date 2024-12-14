import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SpotsDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotData } from '../../store/spots';

function SpotsDetails() {
    //useSelector is similar to useState -> will cause infinite loop
    const spot = useSelector(state => state.spots.spot)

    const { spotId } = useParams();

    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    //useEffect is watching the variables in the [] for changes to break the looping
    useEffect(() => {
        dispatch(getSpotData(spotId))
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId]);

    //The HTML that makes up the component
    return isLoaded ? ( 
        <div className={'spots-details'}>
            <h1>{spot.name}</h1>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
        </div>
    ) : (<h1>...loading</h1>) //love this add fun icon
}

export default SpotsDetails;
