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
