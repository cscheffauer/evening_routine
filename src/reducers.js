import {
    INITIAL_ROUTE,
    CHANGE_DARK_MODE,
    CHANGE_ROUTE,
    ADD_GOAL,
    EDIT_GOAL,
    REMOVE_GOAL,
} from './constants'       //get constants form constants file

//import { getSunrise, getSunset } from 'sunrise-sunset-js';    //imports for sunrise, sunset calculcation

/**
 * CHANGEROUTE REDUCER
 */


//define the initialstate in the reducer 
const initialRoute = {
    route: INITIAL_ROUTE         //initial object in the redux store
}

//searchPeople function -> use default params (initialState, empty action object)
//reducers get a input of a state and action -> if this one get something we care about (like searching people), we will do something
export const changeRoute = (state = initialRoute, action = {}) => {
    switch (action.type) {
        case CHANGE_ROUTE:       //if a CHANGE_SEARCH_FIELD action comes in, we will do something
            return Object.assign({}, state, { route: action.payload })
        //1st param= new object
        //2nd param= state we receiving
        //3rd param=is what we want to change in the state
        //so what we return is a new object with everything in the state + new searchField -> 2nd principle: State is read only
        default:
            return state    //if a other action comes in, return the state as it was passed over and do not change anything
    }
}




/**
 * DARKMODE REDUCER
 */


const calculateDarkMode = () => {
    /* TO CALCULATE SUNRISE / SUNSET BASED ON LOCATION:
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(getSunrise(position.coords.latitude, position.coords.longitude), getSunset(position.coords.latitude, position.coords.longitude));
    });
    */
    var today = new Date();
    var time = today.getHours();
    if (time >= 7 && time <= 18) return false;  //if it's between 7am and 6pm, use lightMode, otherwise darkMode
    return true;
}


const initialDarkMode = {
    darkMode: calculateDarkMode()       //initial object in the redux store
}

//changeDarkMode function -> use default params (initialState, empty action object)
//reducers get a input of a state and action -> if this one get something we care about (like changingDarkMode), we will do something
export const changeDarkMode = (state = initialDarkMode, action = {}) => {
    switch (action.type) {
        case CHANGE_DARK_MODE:       //if a CHANGE_DARK_MODE action comes in, we will do something
            return Object.assign({}, state, { darkMode: action.payload })
        //1st param= new object
        //2nd param= state we receiving
        //3rd param=is what we want to change in the state
        //so what we return is a new object with everything in the state + new darkMode -> 2nd principle: State is read only
        default:
            return state    //if a other action comes in, return the state as it was passed over and do not change anything
    }
}




const initialGoals = {
    goals: [{
        title: 'Programming more',
        description: 'I would like to program more, spend my time on coding and create projects.',
        category: 'Personal Development',
    }, {
        title: 'Get my dream job as a coder',
        description: 'I would like to get that job at Google.',
        category: 'Career',
    }, {
        title: 'More active',
        description: 'I would like to be more active, do more sports.',
        category: 'Physical & Health',
    }, {
        title: 'Get more money',
        description: 'I would like to get more money.',
        category: 'Financial',
    }, {
        title: 'More resistant to stress & anxiety',
        description: 'I would like to get more resistant to stress & anxiety',
        category: 'Psychological',
    }]       //initial object in the redux store
}

//changeGoals function -> use default params (initialState, empty action object)
//reducers get a input of a state and action -> if this one get something we care about (like changeGoals), we will do something
export const changeGoals = (state = initialGoals, action = {}) => {
    switch (action.type) {
        case ADD_GOAL:       //if a ADD_GOAL action comes in, the new goal will added to the existing goals
            const newGoals = [...state.goals, action.payload];
            return Object.assign({}, state, { goals: newGoals })
        case EDIT_GOAL:       //if a EDIT_GOAL action comes in, the edited goals will be the new goal
            return Object.assign({}, state,
                {
                    goals: state.goals.map((goal, index) => index === action.payload.index ?
                        // transform the one with a matching id
                        action.payload.goal :
                        // otherwise return original todo
                        goal
                    )
                }
            )
        case REMOVE_GOAL:       //if a REMOVE_GOAL action comes in, the goal will be removed
            return Object.assign({}, state, { goals: state.goals.filter((goal, index) => index !== action.payload) })
        //1st param= new object
        //2nd param= state we receiving
        //3rd param=is what we want to change in the state
        //so what we return is a new object with everything in the state + new darkMode -> 2nd principle: State is read only
        default:
            return state    //if a other action comes in, return the state as it was passed over and do not change anything
    }
}


/**
 * REQUESTING PEOPLE REDUCER
 */

/*

const initialStatePeople = {
    firstPeoplePending: false,
    morePeoplePending: false,
    people: [],
    error: ''
}

export const requestPeople = (state = initialStatePeople, action = {}) => {
    switch (action.type) {
        case REQUEST_FIRST_PEOPLE_PENDING:
            return Object.assign({}, state, { firstPeoplePending: true })      //everything in the state + new state isPending
        case REQUEST_FIRST_PEOPLE_SUCCESS:
            return Object.assign({}, state, { people: action.payload, firstPeoplePending: false })      //everything in the state + new state isPending & people
        case REQUEST_FIRST_IMAGES_SUCCESS:
            return Object.assign({}, state, { people: action.payload })      //everything in the state + new state isPending & people
        case REQUEST_MORE_PEOPLE_PENDING:
            return Object.assign({}, state, { morePeoplePending: true })      //everything in the state + new state isPending
        case REQUEST_MORE_PEOPLE_SUCCESS:
            return Object.assign({}, state, { people: state.people.concat(action.payload), morePeoplePending: false })      //everything in the state + new state isPending & people
        case REQUEST_MORE_IMAGES_SUCCESS:
            return Object.assign({}, state, { people: [...state.people.slice(0, action.payload.position), ...action.payload.people] })      //everything in the state + new state isPending & people
        case REQUEST_FIRST_PEOPLE_FAILED:
            return Object.assign({}, state, { firstPeoplePending: false, error: action.payload })      //everything in the state + errorstate
        default:
            return state
    }
}
*/
