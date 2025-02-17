import {Link, useNavigate} from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { useModal } from '../../context/Modal';

import './SpotTile.css';
import DeleteSpot from '../DeleteSpot';

function SpotTile({ spot = null, manage = false}) {
    const navigate = useNavigate();
    const { setModalContent } = useModal();

    const updateSpot = (event) => {
        event.preventDefault();
        navigate(`/spots/${spot.id}/edit`)
    }

    const deleteSpot = (event) => {
        event.preventDefault();
        setModalContent(<DeleteSpot id={spot.id}/>)
    }

    //The HTML that makes up the component
    return (
        <Link className={'spot-tile'} to={`/spots/${spot.id}`} title={spot.name}>
            {!spot ? (<h1>No spot provided</h1>) : (
                <>
                    <div>
                        <img src={spot.previewImage} className={'img'} alt={spot.name} width="350" height="335" />
                    </div>
                    <div className='text'>
                        <div className='location-rating'>
                            <p>{spot.city}, {spot.state}</p>
                            <div className='rating'>
                                <FaStar color={'black'} />
                                <span>{spot.avgRating ? spot.avgRating : "New"}</span>
                            </div>
                        </div>
                        <p><b>${spot.price}</b> night</p>
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
        </Link>
    );
}

export default SpotTile;
