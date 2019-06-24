import {CREATE_COURSES} from '../actions/type'

const courses = JSON.parse(localStorage.getItem('course'));
console.log(courses);

const initialState = {
    courses: courses ? courses : [] 
}
const coursesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_COURSES: 
            return {
                ...state,
                courses: action.payload
            }
    
        default:
            break;
    }
    return {...state};
}

export default coursesReducer;