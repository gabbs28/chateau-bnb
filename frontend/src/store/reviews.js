import { csrfFetch } from "./csrf";

// define action types
/* name of the action (think url) that we want to use 
name at end of url shown bbe same as variable name*/

/* define actions
A function that takes in the change you want to make and sends
 it to the reducer along with the action type (url) */

 /* define a thunk
a function that will take in the dispatch, and whatever variable 
you pass into it to do a thing (call the db)
Once the call to the db for the changes you want is made, the function
 dispatches an action with the returned info from the db to update the store
*/
//dispatch will always be there in every thunk
//function that returns a function

export const postReview = async (id, review) => {
    return csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    })
        .then(response => response.json())
}

export const deleteReview = async (id) => {
    return csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',

    })
        .then(response => response.json())
}

/* define a default state
this will be the initial state of the store */
//when I add an addition thunk I need to add another key/value
const initialState = {


};


/* define the reducer
this is basically a router that will change the state based on the 
action type (url) that is passed in to it when called by the thunk */
//don't make another reducer, just add a new case statement
//object keeys are case sensitive
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {

      default:
        return state;
    }
};


export default reviewsReducer