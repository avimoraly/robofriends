import {
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED,
    REQUEST_ROBOTS_PENDING
} from './constants';


export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
});

export const reqeustRobots = (dispatch) => {
    dispatch( {type: REQUEST_ROBOTS_PENDING});
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => dispatch ( {type: REQUEST_ROBOTS_SUCCESS, payload: data}))
        .catch(err=> dispatch ({type: REQUEST_ROBOTS_FAILED, payload: err}))
    
}