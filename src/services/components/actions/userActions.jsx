export const UPDATE_SEARCH_DATA = 'UPDATE_SEARCH_DATA';
export const updateSearchData = (source, destination, date) => ({
  type: UPDATE_SEARCH_DATA,
  payload: { source, destination, date },
});
