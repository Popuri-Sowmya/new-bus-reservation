export const UPDATE_SELECTED_BUS = 'UPDATE_SELECTED_BUS';
export const UPDATE_SELECTED_SEATS = 'UPDATE_SELECTED_SEATS';

export const updateSelectedBus = (bus) => ({
    type: UPDATE_SELECTED_BUS,
    payload: bus,
});
export const updateSelectedSeats = (seats) => ({
    type: UPDATE_SELECTED_SEATS,
    payload: seats,
});
