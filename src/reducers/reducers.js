import {
    INITIAL_ROUTE,
    CHANGE_DARK_MODE,
    CHANGE_ROUTE,
    ADD_GOAL,
    EDIT_GOAL,
    REMOVE_GOAL,
    SAVE_ROUTINE,
    CALCULATE_ROUTINETOSHOW,
    CHANGE_TASK_DONE,
} from '../constants'       //get constants form constants file

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
    goals: []
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


const initialRoutines = {
    routines: [
        {
            id: 0,
            recap: 'Yesterday I figured out how to build nice new stuff in React \nMore text here \nand even more here....',
            tasks: [
                {
                    title: 'Having lunch',
                    description: 'eat something nice',
                    plannedtime: '2020-03-29T10:00:19.238Z',
                    tableData: {
                        id: 0
                    },
                    done: false,
                },
                {
                    title: 'Coding',
                    description: 'more coding :)',
                    plannedtime: '2020-03-29T16:00:19.238Z',
                    tableData: {
                        id: 1
                    },
                    done: false,
                },
                {
                    title: 'Sleeping',
                    description: 'having a power nap',
                    plannedtime: '2020-03-29T13:00:19.238Z',
                    tableData: {
                        id: 2
                    },
                    done: false,
                },
            ],
            goals: [
                {
                    title: 'asdf',
                    description: 'asdf',
                    category: 'Educational'
                }
            ],
            createdAt: 'Sun Mar 29 2020 23:24:34 GMT+0100 (Central European Standard Time)',
        },
        {
            id: 1,
            recap: 'am 22....',
            tasks: [
                {
                    title: 'asdf',
                    tableData: {
                        id: 0
                    },
                    done: true,
                },
                {
                    title: 'asdf',
                    tableData: {
                        id: 1
                    },
                    done: true,
                },
                {
                    title: 'asdf',
                    tableData: {
                        id: 2
                    },
                    done: true,
                }
            ],
            goals: [
                {
                    title: 'asdf',
                    description: 'asdf',
                    category: 'Educational'
                }
            ],
            createdAt: 'Sun Mar 22 2020 23:24:34 GMT+0100 (Central European Standard Time)'
        },
        {
            id: 2,
            recap: 'am 24....',
            tasks: [
                {
                    title: 'asdf',
                    tableData: {
                        id: 0
                    }
                },
                {
                    title: 'asdf',
                    tableData: {
                        id: 1
                    }
                },
                {
                    title: 'asdf',
                    tableData: {
                        id: 2
                    }
                }
            ],
            goals: [
                {
                    title: 'asdf',
                    description: 'asdf',
                    category: 'Educational'
                }
            ],
            createdAt: 'Tue Mar 24 2020 01:24:34 GMT+0100 (Central European Standard Time)'
        },
        {
            id: 3,
            recap: 'am 23....',
            tasks: [
                {
                    title: 'asdf',
                    tableData: {
                        id: 0
                    }
                },
                {
                    title: 'asdf',
                    tableData: {
                        id: 1
                    }
                },
                {
                    title: 'asdf',
                    tableData: {
                        id: 2
                    }
                }
            ],
            goals: [
                {
                    title: 'asdf',
                    description: 'asdf',
                    category: 'Educational'
                }
            ],
            createdAt: 'Mon Mar 23 2020 23:24:34 GMT+0100 (Central European Standard Time)'
        },

    ],
    routineToShow: {}
}

const calculateRoutineToShow = (routines) => {
    var now = new Date();

    var midnight = new Date(new Date().toDateString());
    /*
                var six = new Date(new Date().toDateString());;
                six.setHours(midnight.getHours() + 6);
    
                var eightteen = new Date(new Date().toDateString());
                eightteen.setHours(midnight.getHours() + 18);
    
                var endofday = new Date(new Date().toDateString());
                endofday.setDate(midnight.getDate() + 1);
                endofday.setMilliseconds(endofday.getMilliseconds() - 1);
    
                var yesterday = new Date(new Date().toDateString());
                yesterday.setDate(midnight.getDate() - 1);
    */
    var yesterdaySix = new Date(new Date().toDateString());
    yesterdaySix.setDate(midnight.getDate() - 1);
    yesterdaySix.setHours(yesterdaySix.getHours() + 6);

    routines.sort((a, b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    });
    const routineToReturn = routines.find(routine => (Date.parse(yesterdaySix) < Date.parse(routine.createdAt)) && (Date.parse(routine.createdAt) <= Date.parse(now)));
    return routineToReturn !== undefined ? routineToReturn : {};
}


export const changeRoutines = (state = initialRoutines, action = {}) => {
    var routineToShow = {};
    switch (action.type) {
        case SAVE_ROUTINE:       //if a ADD_GOAL action comes in, the new goal will added to the existing goals
            const newRoutine = Object.assign({
                id: Math.max(0, ...state.routines.map(r => r.id)) + 1,
            }, action.payload);
            const newRoutines = [...state.routines, newRoutine];
            routineToShow = calculateRoutineToShow(newRoutines);
            return Object.assign({}, state, { routines: newRoutines, routineToShow: routineToShow })

        case CALCULATE_ROUTINETOSHOW:
            routineToShow = calculateRoutineToShow(state.routines);
            return Object.assign({}, state, { routineToShow: routineToShow })

        case CHANGE_TASK_DONE:
            return Object.assign({}, state,
                {
                    routines: state.routines.map((routine) => routine.id === action.payload.routineIndex ?
                        // transform the routine with a matching routineIndex
                        Object.assign({}, routine,
                            {
                                tasks: routine.tasks.map((task) => task.tableData.id === action.payload.taskIndex ?
                                    // transform the task with a matching taskIndex
                                    { ...task, done: action.payload.done }
                                    :
                                    // otherwise return original task
                                    task
                                )
                            })
                        :
                        // otherwise return original routine
                        routine
                    ),
                    routineToShow:
                        state.routineToShow.id === action.payload.routineIndex ?
                            Object.assign({}, state.routineToShow,
                                {
                                    tasks: state.routineToShow.tasks.map((task) => task.tableData.id === action.payload.taskIndex ?
                                        // transform the task with a matching taskIndex
                                        { ...task, done: action.payload.done }
                                        :
                                        // otherwise return original task
                                        task
                                    )
                                })
                            :
                            // otherwise return original routineToShow
                            state.routineToShow
                });
        default:
            return state    //if a other action comes in, return the state as it was passed over and do not change anything
    }
}

