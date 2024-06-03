import React, { useState, useContext } from 'react';
import { SearchBusContext } from './SearchBusContext';
import '../styles/DisplayComponent.css';
import FilterComponent from './FilterComponent';
import SeatSelection from './SeatSelection';
import { useDispatch } from 'react-redux';
import { updateSelectedBus } from './actions/BusActions';
import BusService from '../services/BusService';
import { useSelector } from 'react-redux';

function DisplayComponent() {
  const dispatch = useDispatch();
  const { searchBusList } = useContext(SearchBusContext);
  const [filteredBusList, setFilteredBusList] = useState(searchBusList);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const handleShowSeats = (busId) => {
    setSelectedBusId(prevSelectedBusId => prevSelectedBusId === busId ? null : busId);
    BusService.getBusbyId(busId,token).then(response => {
      console.log("bus selected is", response.data);
      const bus = response.data;
      dispatch(updateSelectedBus(bus));
    })
      .catch(error => {
        console.error("Error fetching buses:", error);
      });
  };

  const handleFilterChange = (filters) => {
    console.log("handleFilterChange function called")
    let filteredBuses = [...searchBusList];
    console.log("filters in handleFilterChange", filters)

    if (filters.priceRange && filters.priceRange.min !== undefined && filters.priceRange.max !== undefined) {
      filteredBuses = filteredBuses.filter(bus => {
        const farePerSeat = parseInt(bus.farePerSeat);
        const minPrice = parseInt(filters.priceRange.min);
        const maxPrice = parseInt(filters.priceRange.max);
        return farePerSeat >= minPrice && farePerSeat <= maxPrice;
      });
    }

    const{AC,NonAC} = filters.busTypes;
    const allBusUnchecked =  !AC && !NonAC
    if(!allBusUnchecked) {
      filteredBuses = filteredBuses.filter(bus => {
        const busType = bus.busType
        if(AC && busType == 'AC'){
          return true;
        } else if(NonAC && busType=='Non-AC'){
          return true;
        }
        return false;
      })
      setFilteredBusList(filteredBuses);
    }

    const { before6am, from6amto12pm, from12pmto6pm, after6pm } = filters.departureTimeFilters;
    const allUnchecked = !before6am && !from6amto12pm && !from12pmto6pm && !after6pm;

    if (!allUnchecked) {
      console.log("filters for departure time received are", filters.departureTimeFilters);
      filteredBuses = filteredBuses.filter(bus => {
        const departureTime = parseInt(bus.departureTime.replace(':', ''));
        if (before6am && departureTime < 600) {
          return true;
        } else if (from6amto12pm && departureTime >= 600 && departureTime < 1200) {
          return true;
        } else if (from12pmto6pm && departureTime >= 1200 && departureTime < 1800) {
          return true;
        } else if (after6pm && departureTime >= 1800) {
          return true;
        }
        return false;
      });
    }
    setFilteredBusList(filteredBuses);
  };


  return (
    <div className="bus-container">
      <div className="filter-section">
        <FilterComponent onFilterChange={handleFilterChange} />
      </div>
      <h1>Search Bus Data</h1>
      {filteredBusList.length > 0 ? (
        filteredBusList.map((bus, key) => (
          <div key={key} className="bus-item">
            <div className="row">
              <div className="col"><h5>{bus.busName}</h5></div>
              <div className="col">{bus.busType}</div>
              <div className="col">Rs.{bus.farePerSeat}</div>
              <div className="col">Arrives at: {bus.arrivalTime}</div>
              <div className="col">Starts at: {bus.departureTime}</div>
              <div className="col">{bus.availableSeats} seats available</div>
              <div className="col">
                <button onClick={() => handleShowSeats(bus.busid)} className="btn btn-primary">
                  {selectedBusId === bus.busid ? "Hide Seats" : "Select Seats"}
                </button>
              </div>
            </div>
            {selectedBusId === bus.busid && (
              <SeatSelection />
            )}
          </div>
        ))
      ) : (
        <div className="no-bus">No buses found.</div>
      )}
    </div>
  );
}

export default DisplayComponent;