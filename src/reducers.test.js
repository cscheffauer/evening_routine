import {
    CHANGE_SEARCH_FIELD,
    REQUEST_PEOPLE_PENDING,
    REQUEST_PEOPLE_SUCCESS,
    REQUEST_PEOPLE_FAILED
} from './constants'       //get constants form constants file


import * as reducers from './reducers';     //import all reducers in the reducers file

describe('searchPeople', () => {
    const initialStateSearch = {
        searchField: ''
    }
    it('should return the initial state', () => {
        expect(reducers.searchPeople(undefined, {})).toEqual({ searchField: '' });
    })

    it('should handle CHANGE_SEARCHFIELD', () => {
        expect(reducers.searchPeople(initialStateSearch, {
            type: CHANGE_SEARCH_FIELD,
            payload: 'abc'
        })).toEqual({ searchField: 'abc' });
    })
})

describe('requestPeople', () => {
    const initialStatePeople = {
        people: [],
        isPending: false,
        error: ''
    }
    it('should return the initial state', () => {
        expect(reducers.requestPeople(undefined, {})).toEqual(initialStatePeople);
    })

    it('should handle REQUEST_PEOPLE_PENDING', () => {
        expect(reducers.requestPeople(initialStatePeople, {
            type: REQUEST_PEOPLE_PENDING
        })).toEqual({ people: [], isPending: true, error: '' });
    })

    it('should handle REQUEST_PEOPLE_SUCCESS', () => {
        expect(reducers.requestPeople(initialStatePeople, {
            type: REQUEST_PEOPLE_SUCCESS,
            payload: [{
                id: '123',
                name: 'test',
                email: 'test@gmail.com'
            }]
        })).toEqual({
            people: [{
                id: '123',
                name: 'test',
                email: 'test@gmail.com'
            }], isPending: false, error: ''
        });
    })

    it('should handle REQUEST_PEOPLE_FAILED', () => {
        expect(reducers.requestPeople(initialStatePeople, {
            type: REQUEST_PEOPLE_FAILED,
            payload: 'NOOO!'
        })).toEqual({
            people: [], isPending: false, error: 'NOOO!'
        });
    })
})