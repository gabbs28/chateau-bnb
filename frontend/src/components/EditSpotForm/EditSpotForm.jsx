import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

    //returns one object with prview true
    const previewImg = isLoaded ? spot.SpotImages
        .filter((spotImage) => spotImage.preview)
        .shift() : {};

    //returns an array of image objects
    const imgUrls = isLoaded ? spot.SpotImages
        .filter((spotImage) => !spotImage.preview)
        .slice(0, 4) : [];

    // spot api gave us the imgs in nested object, 
    // needed to extract that data and pass to forms in a simpler way
    const data = {
        country: spot.country,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        lat: spot.lat,
        lng: spot.lng,
        description: spot.description,
        name: spot.name,
        price: spot.price,
        "preview-image": previewImg.url,
        "image-url-one": imgUrls[0]?.url,
        "image-url-two": imgUrls[1]?.url,
        "image-url-three": imgUrls[2]?.url,
        "image-url-four": imgUrls[3]?.url
    }
 
    //The HTML that makes up the component
    return isLoaded ? (
        <div className={'edit-spot-form'}>
            <SpotForm spot={data}/>
        </div>
    ) : (<h1>...loading</h1>) //love this add fun icon
}

export default EditSpotForm;
