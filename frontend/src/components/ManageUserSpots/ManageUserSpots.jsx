import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SpotTile from '../SpotTile';
import { getCurrentUserSpotsData } from '../../store/spots';

import './ManageUserSpots.css';

function ManageUserSpots() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);
    const currentUserSpots = useSelector(store => store.spots.currentUserSpots)
    
    const createNewSpot = () => {
        navigate('/spots/new')
    }
    //To provide realtime feedback, use "useEffect". In this example the variable "impNickName"
    //is watched and whenever it changes, the function below is run.
    useEffect(() => {
        dispatch(getCurrentUserSpotsData())
            .then(() => setIsLoaded(true))
    }, [dispatch]);


    //The HTML that makes up the component
    return isLoaded ? (
        <div className={'manage-user-spots'}>
            <h1>Manage Spots</h1>
            <button onClick={createNewSpot} className={'grey'}>Create a new spot</button>
            <div className={'spot-tiles'}>
                {currentUserSpots.map(spot => <SpotTile key={spot.id} spot={spot} manage={true}/> )}
            </div>
        </div>
    ) : (<h1>...loading</h1>) //love this add fun icon
}

export default ManageUserSpots;
