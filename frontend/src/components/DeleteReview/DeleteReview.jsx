import DeleteResource from '../DeleteResource';
import { deleteReview, getCurrentUserSpotsData } from '../../store/spots';

import './DeleteReview.css';

function DeleteReview({id}) {
    

    //The HTML that makes up the component
    return (
        <div className={'delete-review'}>
            <DeleteResource 
                type={"Review"} 
                action={async () => deleteReview(id)} 
                refresh={getCurrentUserSpotsData}
            />
        </div>
    );
}

export default DeleteReview;
