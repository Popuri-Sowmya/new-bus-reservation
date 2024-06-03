import { UPDATE_SEARCH_DATA } from '../actions/userActions';

const initialState = {
    source: '',
    destination: '',
    date: '',
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_DATA:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default searchReducer;
