import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import SpotForm from '../SpotForm';

import './CreateSpotForm.css';

function CreateSpotForm() {
    //The HTML that makes up the component
    return (
        <div className={'create-spot-form'}>
            <SpotForm />
        </div>
    );
}

export default CreateSpotForm;
