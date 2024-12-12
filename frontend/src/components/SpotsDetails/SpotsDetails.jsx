import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './SpotsDetails.css';
import { useSelector } from 'react-redux';

function SpotsDetails() {
    const spot = useSelector(state => state.spots.spot)
    //The HTML that makes up the component
    return (
        <div className={'spots-details'}>

        </div>
    );
}

export default SpotsDetails;
