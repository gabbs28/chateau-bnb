import DeleteResource from '../DeleteResource';
import { deleteSpot, getCurrentUserSpotsData } from '../../store/spots';

import './DeleteSpot.css';
import {useDispatch} from "react-redux";

function DeleteSpot({id}) {
    const dispatch = useDispatch();

    //The HTML that makes up the component
    return (
        <div className={'delete-spot'}>
            <DeleteResource 
                type={"Spot"} 
                action={async () => await deleteSpot(id)} 
                refresh={() => dispatch(getCurrentUserSpotsData())}
            />
        </div>
    );
}

export default DeleteSpot;
