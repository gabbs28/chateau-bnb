import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsData } from '../../store/spots';
import SpotTile from '../SpotTile';

function LandingPage() {
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false);
    const allSpots = useSelector(store => store.spots.allSpots)
    

    //To provide realtime feedback, use "useEffect". In this example the variable "impNickName"
    //is watched and whenever it changes, the function below is run.
    useEffect(() => {
        dispatch(getAllSpotsData())
            .then(() => setIsLoaded(true))
    }, [dispatch]);


    //The HTML that makes up the component
    return isLoaded ? (
        <div className={'landing-page'}>
            <h1>CHATEAU BNB</h1> 
            <div className={'tiles'}>
                {allSpots.map(spot => <SpotTile key={spot.id} spot={spot}/> )}
            </div>
        </div>
    ) : (<h1>...loading</h1>) //love this add fun icon
}

export default LandingPage;
