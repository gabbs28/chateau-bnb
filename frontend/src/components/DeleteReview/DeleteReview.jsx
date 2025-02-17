import DeleteResource from '../DeleteResource';
import { getSpotData, getSpotReviewsData } from '../../store/spots';
import {deleteReview} from '../../store/reviews';

import './DeleteReview.css';

function DeleteReview({reviewId, spotId}) {

    //The HTML that makes up the component
    return (
        <div className={'delete-review'}>
            <DeleteResource 
                type={"Review"} 
                action={async () => await deleteReview(reviewId)} 
                refresh={ async () => await Promise.all(
                            [
                                dispatch(getSpotData(spotId)), 
                                dispatch(getSpotReviewsData(spotId))
                            ]
                        )}
            />
        </div>
    );
}

export default DeleteReview;
