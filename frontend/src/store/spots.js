import { csrfFetch } from "./csrf";

// define action types
/* name of the action (think url) that we want to use 
name at end of url shown bbe same as variable name*/
const GET_SPOT = "spots/getSpot"
const GET_ALL_SPOTS = "spots/getAllSpots"
const GET_SPOT_REVIEWS = "spots/getSpotReviews"
const GET_CURRENT_USER_SPOTS = "spots/getCurrentUserSpots"



/* define actions
A function that takes in the change you want to make and sends
 it to the reducer along with the action type (url) */
const getSpotAction = (spot) => {
    return {
        type: GET_SPOT,
        payload: spot
    };
}

const getAllSpotsAction = (allSpots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: allSpots
    };
}

const getSpotReviewsAction = (spotReviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        payload: spotReviews
    }
}

const getCurrentUserSpotsAction = (currentUserSpots) => {
    return {
        type: GET_CURRENT_USER_SPOTS,
        payload: currentUserSpots
    }
}


/* define a thunk
a function that will take in the dispatch, and whatever variable 
you pass into it to do a thing (call the db)
Once the call to the db for the changes you want is made, the function
 dispatches an action with the returned info from the db to update the store
*/
//dispatch will always be there in every thunk
//function that returns a function
export const getSpotData = (spotId) => {
    return async (dispatch) => {
        //api call
        return csrfFetch(`/api/spots/${spotId}`)
            .then(response => response.json()) //api communicates in json
            .then(spotData => {
                dispatch(getSpotAction(spotData)); 
            })
    }
}


/*  this is the object the fetch call is returning (spotData)
{
      "id": 1,
      "ownerId": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "lat": 37.7645358,
      "lng": -122.4730327,
      "name": "App Academy",
      "description": "Place where web developers are created",
      "price": 123,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
      "numReviews": 5,
      "avgStarRating": 4.5,
      "SpotImages": [
        {
          "id": 1,
          "url": "image url",
          "preview": true
        },
        {
          "id": 2,
          "url": "image url",
          "preview": false
        }
      ],
      "Owner": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      }
    }
*/

export const getAllSpotsData = () => {
    return async (dispatch) => {
        //api call
        return csrfFetch(`/api/spots`)
            .then(response => response.json()) //api communicates in json
            .then(allSpotsData => {
                dispatch(getAllSpotsAction(allSpotsData)); 
            })
    }
}

export const getSpotReviewsData = (spotId) => {
    return async (dispatch) => {
        return csrfFetch(`/api/spots/${spotId}/reviews`)
        .then(response => response.json()) //api communicates in json
            .then(spotReviewsData => {
                dispatch(getSpotReviewsAction(spotReviewsData)); 
            })
    }
}

export const getCurrentUserSpotsData = () => {
    return async (dispatch) => {
        //api call
        return csrfFetch("/api/spots/current")
            .then(response => response.json()) //api communicates in json
            .then(currentUserSpotsData => {
                dispatch(getCurrentUserSpotsAction(currentUserSpotsData)); 
            })
    }
}

//takes in data, call spot POST API, returns parsed JSON if not error

export const postSpot = async (spot) => {
    return csrfFetch(`/api/spots`, {
        method: 'POST',
        body: JSON.stringify(spot)
    })
        .then(response => response.json())
}

//takes in data, call spot PUT API, returns parsed JSON if not error

export const putSpot = async (id, spot) => {
    return csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    })
        .then(response => response.json())
}

export const deleteSpot = async (id) => {
    return csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',

    })
        .then(response => response.json())
}

/* define a default state
this will be the initial state of the store */
//when I add an addition thunk I need to add another key/value
const initialState = {
    spot: {},
    allSpots: [],
    spotReviews: [],
    currentUserSpots: []

};



/* define the reducer
this is basically a router that will change the state based on the 
action type (url) that is passed in to it when called by the thunk */
//don't make another reducer, just add a new case statement
//object keeys are case sensitive
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOT:
            //this goes to useSelector
            return { ...state, spot: action.payload }
        case GET_ALL_SPOTS:
            return { ...state, allSpots: action.payload.Spots}
        case GET_SPOT_REVIEWS:
            return { ...state, spotReviews: action.payload.Reviews}
        case GET_CURRENT_USER_SPOTS:
            return { ...state, currentUserSpots: action.payload.Spots}
      default:
        return state;
    }
};


export default spotsReducer