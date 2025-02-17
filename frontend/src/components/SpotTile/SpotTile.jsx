import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { useModal } from '../../context/Modal';

import './SpotTile.css';
import DeleteSpot from '../DeleteSpot';

function SpotTile({ spot = null, manage = false}) {
    const navigate = useNavigate();
    const { setModalContent } = useModal();

    const updateSpot = () => {
        navigate(`/spots/${spot.id}/edit`)
    }

    const deleteSpot = () => {
        setModalContent(<DeleteSpot id={spot.id}/>)
    }

    //The HTML that makes up the component
    return (
        <div className={'spot-tile'} >

            {!spot ? (<h1>No spot provided</h1>) : (
                <>
                    <div>
                        <img src={spot.previewImage} className={'img'} alt="IMG" width="350" height="335" />
                    </div>
                    <div className='text'>
                        <div className='location-rating'>
                            <p>{spot.city}, {spot.state}</p>
                            <div className='rating'>
                                <h5><FaStar />{spot.avgRating ? spot.avgRating : "New"}</h5>{}
                            </div>
                        </div>

                        <p><span className='be-bold'>${spot.price}</span> night</p>
                    </div>
                    <div hidden={!manage}>
                        <button className={"grey"} onClick={updateSpot}>
                            Update
                        </button>
                        <button className={"grey"} onClick={deleteSpot}>
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default SpotTile;
