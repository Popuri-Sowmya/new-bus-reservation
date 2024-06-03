import { UPDATE_SELECTED_BUS, UPDATE_SELECTED_SEATS } from '../actions/BusActions';

const initialState = {
  selectedBus: {},
  selectedSeats: [],
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_BUS:
      return {
        ...state,
        selectedBus: action.payload,
      };
    case UPDATE_SELECTED_SEATS:
      return {
        ...state,
        selectedSeats: action.payload,
      };
    default:
      return state;
  }
};

export default busReducer;