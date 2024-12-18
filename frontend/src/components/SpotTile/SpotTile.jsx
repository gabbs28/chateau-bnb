import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './SpotTile.css';

function SpotTile({ spot = null }) {

    //still need ratings


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
                                <h5>{spot.avgRating}</h5>{/*make rating display stars*/}
                            </div>
                        </div>

                        <p><span className='be-bold'>${spot.price}</span> night</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default SpotTile;
