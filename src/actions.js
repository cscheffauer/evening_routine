import {
    CHANGE_DARK_MODE,
    CHANGE_ROUTE,
    ADD_GOAL,
    EDIT_GOAL,
    REMOVE_GOAL,
} from './constants'       //get constants form constants file


//import { getFirstPeople, getMorePeople, replaceSpeciesName } from './api/api';

//first action in here - this action will receive input of text which the user types - it will return a object with type and payload
//this action will send the object on to the reducer
export const setRoute = (route) => ({
    type: CHANGE_ROUTE,                  //constants are usually capitalized - we use a variable here to avoid misspelling 
    payload: route
})



//first action in here - this action will receive input of text which the user types - it will return a object with type and payload
//this action will send the object on to the reducer
export const setDarkMode = (boolean) => ({
    type: CHANGE_DARK_MODE,                  //constants are usually capitalized - we use a variable here to avoid misspelling 
    payload: boolean
})

export const addGoal = (goal) => ({
    type: ADD_GOAL,                  //constants are usually capitalized - we use a variable here to avoid misspelling 
    payload: goal
})

export const editGoal = (goal, index) => ({
    type: EDIT_GOAL,                  //constants are usually capitalized - we use a variable here to avoid misspelling 
    payload: { goal: goal, index: index }
})

export const removeGoal = (index) => ({
    type: REMOVE_GOAL,                  //constants are usually capitalized - we use a variable here to avoid misspelling 
    payload: index
})





//actions can just be objects {}
/*
export const requestPeople = () => (dispatch) => {          //this action will take the dispatch to get access to it - requestPeople returns a function and thunk middleware will hook on it
    dispatch({ type: REQUEST_FIRST_PEOPLE_PENDING });             //dispatch the pending action - "will call the action in reducer" - so the PENDING will be called right away
    getFirstPeople('https://swapi.co/api/people/')         //make this http request & convert it to JSON
        .then(firstPeople => dispatch({ type: REQUEST_FIRST_PEOPLE_SUCCESS, payload: firstPeople.people, next: firstPeople.nextLink }))        //call the SUCCESS in reducer with the user payload
        .then(firstPeople => {
            replaceSpeciesName(firstPeople.payload)
                .then(firstPeopleWSpecies => {
                    dispatch({ type: REQUEST_FIRST_IMAGES_SUCCESS, payload: firstPeopleWSpecies });
                    dispatch({ type: REQUEST_MORE_PEOPLE_PENDING });
                    getMorePeople(firstPeople.next)
                        .then(morePeople => dispatch({ type: REQUEST_MORE_PEOPLE_SUCCESS, payload: morePeople }))
                        .then(morePeople => {
                            replaceSpeciesName(morePeople.payload)
                                .then(morePeopleWSpecies => {
                                    dispatch({ type: REQUEST_MORE_IMAGES_SUCCESS, payload: { people: morePeopleWSpecies, position: firstPeople.payload.length } });
                                })
                        })
                })
        })
        .catch(error => dispatch({ type: REQUEST_FIRST_PEOPLE_FAILED, payload: error }))
}
*/
