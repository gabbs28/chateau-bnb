import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SpotForm from '../SpotForm';
import { getSpotData } from '../../store/spots';

import './EditSpotForm.css';

function EditSpotForm() {
    //dispatch returns a promise
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
    //only runs after the render is complete or any of its dependencies have changed
    useEffect(() => {
        dispatch(getSpotData(params.spotId))
            .then(() => setIsLoaded(true))
    }, [dispatch, params.spotId]);

    //The HTML that makes up the component
    return isLoaded ? (
        <div className={'edit-spot-form'}>
            <SpotForm spot={spot}/>
        </div>
    ) : (<h1>...loading</h1>) //love this add fun icon
}

export default EditSpotForm;
