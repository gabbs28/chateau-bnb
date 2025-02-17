import DeleteResource from '../DeleteResource';
import { deleteSpot, getCurrentUserSpotsData } from '../../store/spots';

import './DeleteSpot.css';

function DeleteSpot({id}) {
    

    //The HTML that makes up the component
    return (
        <div className={'delete-spot'}>
            <DeleteResource 
                type={"Spot"} 
                action={async () => deleteSpot(id)} 
                refresh={getCurrentUserSpotsData}
            />
        </div>
    );
}

export default DeleteSpot;
