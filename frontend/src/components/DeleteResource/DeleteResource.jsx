import { useState } from 'react';
import { useModal } from '../../context/Modal';

import './DeleteResource.css';

function DeleteResource({type, action, refresh}) {
    const { closeModal } = useModal();

    const [error, setError] = useState(null);

    const remove = () => {
        action()
            .then(() => refresh())
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
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this {type.toLowerCase()}?</p>
            {error && (<p className='error'>{error}</p>)}
            <button onClick={remove}>
                Yes (Delete {type})
            </button> <br />
            <button onClick={keep} className={'grey'}>
                No (Keep {type})
            </button>
        </div>
    );
}

export default DeleteResource;
