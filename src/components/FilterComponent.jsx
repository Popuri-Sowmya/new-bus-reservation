import React, { useState } from 'react';
import '../styles/FilterComponent.css';
import MultiRangeSlider from './MultiRangeSlider';

const FilterComponent = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState({ min: 300, max: 5000 });
  const [busTypes, setBusTypes] = useState({
    AC: false,
    NonAC: false,
  });
  const [departureTimeFilters, setDepartureTimeFilters] = useState({
    before6am: false,
    from6amto12pm: false,
    from12pmto6pm: false,
    after6pm: false,
  });

  // Handle change in price range filter
  const handlePriceRangeChange = ({ min, max }) => {
    if (min !== priceRange.min || max !== priceRange.max) {
      setPriceRange({ min, max });
      applyFilters({ priceRange: { min, max }, busTypes, departureTimeFilters });
    }
  };

  // Handle change in bus type filter
  const handleBusTypeChange = (e) => {
    const { id, checked } = e.target;
    setBusTypes({ ...busTypes, [id]: checked });
    applyFilters({ priceRange, busTypes: { ...busTypes, [id]: checked }, departureTimeFilters });
  };

  // Handle change in departure time filter
  const handleDepartureTimeChange = (e) => {
    const { name, checked } = e.target;
    setDepartureTimeFilters({ ...departureTimeFilters, [name]: checked });
    applyFilters({ priceRange, busTypes, departureTimeFilters: { ...departureTimeFilters, [name]: checked } });
  };

  // Function to apply filters and trigger onFilterChange
  const applyFilters = (filters) => {
    onFilterChange(filters);
  };

  return (
    <div className="filter-container">
      <h3>Filters</h3>
      <br />
      <div className="filter-item">
        <label><h6>Price Range:</h6></label>
        <MultiRangeSlider
          min={300}
          max={5000}
          onChange={handlePriceRangeChange}
        />
      </div>
      <br/>
      <br/>
      <div className="filter-item">
        <label><h6>Bus Type</h6></label>
        <br />
        <div>
          <input type="checkbox" id="AC" checked={busTypes.AC} onChange={handleBusTypeChange} />
          &nbsp;<label htmlFor="AC">AC</label>
        </div>
        <div>
          <input type="checkbox" id="NonAC" checked={busTypes.NonAC} onChange={handleBusTypeChange} />
          &nbsp;<label htmlFor="NonAC">Non-AC</label>
        </div>
      </div>
      <div className="filter-item">
        <label><h6>Departure Time</h6></label>
        <br />
        <div>
          <input type="checkbox" id="before6am" name="before6am" checked={departureTimeFilters.before6am} onChange={handleDepartureTimeChange} />
          &nbsp;<label htmlFor="before6am">Before 6am</label>
        </div>
        <div>
          <input type="checkbox" id="from6amto12pm" name="from6amto12pm" checked={departureTimeFilters.from6amto12pm} onChange={handleDepartureTimeChange} />
          &nbsp;<label htmlFor="from6amto12pm">6am to 12pm</label>
        </div>
        <div>
          <input type="checkbox" id="from12pmto6pm" name="from12pmto6pm" checked={departureTimeFilters.from12pmto6pm} onChange={handleDepartureTimeChange} />
          &nbsp;<label htmlFor="from12pmto6pm">12pm to 6pm</label>
        </div>
        <div>
          <input type="checkbox" id="after6pm" name="after6pm" checked={departureTimeFilters.after6pm} onChange={handleDepartureTimeChange} />
          &nbsp;<label htmlFor="after6pm">After 6pm</label>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;


// import React, { useState, useContext } from 'react';

// import { SearchBusContext } from './SearchBusContext';

// import '../styles/DisplayComponent.css';

// import FilterComponent from './FilterComponent';

// import SeatSelection from './SeatSelection';

// import { useDispatch } from 'react-redux';

// import { updateSelectedBus } from './actions/BusActions';

// import BusService from '../services/BusService';

// import { useSelector } from 'react-redux';

// import { Table, Container, Row, Col, Button } from 'react-bootstrap';

 

// function DisplayComponent() {

//   const dispatch = useDispatch();

//   const { searchBusList } = useContext(SearchBusContext);

//   const [filteredBusList, setFilteredBusList] = useState(searchBusList);

//   const [selectedBusId, setSelectedBusId] = useState(null);

//   const token = useSelector((state) => state.auth.token);

 

//   const handleShowSeats = (busId) => {

//     setSelectedBusId(prevSelectedBusId => prevSelectedBusId === busId ? null : busId);

//     BusService.getBusbyId(busId, token).then(response => {

//       console.log("bus selected is", response.data);

//       const bus = response.data;

//       dispatch(updateSelectedBus(bus));

//     })

//       .catch(error => {

//         console.error("Error fetching buses:", error);

//       });

//   };

 

//   const handleFilterChange = (filters) => {

//     console.log("handleFilterChange function called")

//     let filteredBuses = [...searchBusList];

//     console.log("filters in handleFilterChange", filters)

 

//     if (filters.priceRange && filters.priceRange.min !== undefined && filters.priceRange.max !== undefined) {

//       filteredBuses = filteredBuses.filter(bus => {

//         const farePerSeat = parseInt(bus.farePerSeat);

//         const minPrice = parseInt(filters.priceRange.min);

//         const maxPrice = parseInt(filters.priceRange.max);

//         return farePerSeat >= minPrice && farePerSeat <= maxPrice;

//       });

//     }

 

//     const { AC, NonAC } = filters.busTypes;

//     const allBusUnchecked = !AC && !NonAC

//     if (!allBusUnchecked) {

//       filteredBuses = filteredBuses.filter(bus => {

//         const busType = bus.busType

//         if (AC && busType == 'AC') {

//           return true;

//         } else if (NonAC && busType == 'Non-AC') {

//           return true;

//         }

//         return false;

//       })

//       setFilteredBusList(filteredBuses);

//     }

 

//     const { before6am, from6amto12pm, from12pmto6pm, after6pm } = filters.departureTimeFilters;

//     const allUnchecked = !before6am && !from6amto12pm && !from12pmto6pm && !after6pm;

 

//     if (!allUnchecked) {

//       console.log("filters for departure time received are", filters.departureTimeFilters);

//       filteredBuses = filteredBuses.filter(bus => {

//         const departureTime = parseInt(bus.departureTime.replace(':', ''));

//         if (before6am && departureTime < 600) {

//           return true;

//         } else if (from6amto12pm && departureTime >= 600 && departureTime < 1200) {

//           return true;

//         } else if (from12pmto6pm && departureTime >= 1200 && departureTime < 1800) {

//           return true;

//         } else if (after6pm && departureTime >= 1800) {

//           return true;

//         }

//         return false;

//       });

//     }

//     setFilteredBusList(filteredBuses);

//   };

 

 

//   return (

//     <div class="container">

//       <div class="row">

//         <div class="col-xs-12 md-8"><div>

//           <h1>Search Bus Data</h1>

//           {filteredBusList.length > 0 ? (

//             filteredBusList.map((bus, key) => (

//               <div key={key} className="bus-item">

//                 <div className="row">

//                   <div className="col"><h5>{bus.busName}</h5></div>

//                   <div className="col">{bus.busType}</div>

//                   <div className="col">Rs.{bus.farePerSeat}</div>

//                   <div className="col">Arrives at: {bus.arrivalTime}</div>

//                   <div className="col">Starts at: {bus.departureTime}</div>

//                   <div className="col">{bus.availableSeats} seats available</div>

//                   <div className="col">

//                     <button onClick={() => handleShowSeats(bus.busid)} className="btn btn-primary">

//                       {selectedBusId === bus.busid ? "Hide Seats" : "Select Seats"}

//                     </button>

//                   </div>

//                 </div>

//                 {selectedBusId === bus.busid && (

//                   <SeatSelection />

//                 )}

//               </div>

//             ))

//           ) : (

//             <div className="no-bus">No buses found.</div>

//           )}

//         </div></div>

//         <div class="col-xs-6 md-4">

//           <div className="filter-section">

//             <FilterComponent onFilterChange={handleFilterChange} />

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }

 

// export default DisplayComponent;