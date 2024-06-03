const initialState = {
    names: [],
};

const seatSelectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PASSENGER_NAMES':
            return {
                ...state,
                names: action.payload,
            };
        default:
            return state;
    }
};

export default seatSelectionReducer;