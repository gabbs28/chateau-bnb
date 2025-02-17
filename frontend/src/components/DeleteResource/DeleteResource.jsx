import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';

import './DeleteResource.css';

function DeleteResource({type, action, refresh}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [error, setError] = useState(null);

    const remove = () => {
        action()
            //NOTE TO IMP; NEEDED TO PASS REFRESH TO DISPATCH
            .then(() => dispatch(refresh()))
            .then(() => closeModal())
            .catch(response => {
                response.json()
                    .then(json => setError(json.message))
            })
        
    }

    const keep = () => {
        closeModal()
    }

    //The HTML that makes up the component
    return (
        <div className={'delete-resource'}>
            <div>
                <h1>Confirm Delete</h1>
                <h3>Are you sure you want to remove this {type.toLowerCase()}?</h3>
            </div>
            {error && (<p className='error'>{error}</p>)}
            <div>
                <button onClick={remove}>
                    Yes (Delete {type})
                </button> <br />
                <button onClick={keep}>
                    No (Keep {type})
                </button>
            </div>
        </div>
    );
}

export default DeleteResource;
