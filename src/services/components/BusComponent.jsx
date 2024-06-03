import React, { useState, useEffect } from 'react';
import BusService from '../services/BusService.jsx';
import RouteService from '../services/RouteService.jsx';
import { useSelector } from 'react-redux';

export const BusComponent = () => {
    const [routes, setRoutes] = useState([]);
    const [selectedRouteId, setSelectedRouteId] = useState('');
    const [busName, setBusName] = useState('');
    const [driverName, setDriverName] = useState('');
    const [busType, setBusType] = useState('AC');
    const [busRegNumber, setBusRegNumber] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [totalSeats, setTotalSeats] = useState(0);
    const [availableSeats, setAvailableSeats] = useState(0);
    const [farePerSeat, setFarePerSeat] = useState(0);
    const [busJourneyDate, setBusJourneyDate] = useState('');
    const [trackingURL, setTrackingURL] = useState('');
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = () => {
        RouteService.getAllRoutes()
            .then(response => {
                setRoutes(response.data);
            })
            .catch(error => {
                console.error("Error fetching routes:", error);
            });
    };

    const handleRouteChange = event => {
        setSelectedRouteId(event.target.value);
    };

    const saveBus = e => {
        e.preventDefault();
        const route = routes.find(route => route.routeid === parseInt(selectedRouteId));
        const bus = {
            busName,
            driverName,
            busType,
            busRegNumber,
            routeFrom: route.routeFrom,
            routeTo: route.routeTo,
            arrivalTime,
            departureTime,
            totalSeats,
            availableSeats,
            farePerSeat,
            busJourneyDate,
            trackingURL,
            route
        };
        BusService.addBus(bus, token)
            .then(response => {
                console.log("Response received from add bus API:", response.data);
                alert("Bus added successfully!");
                setArrivalTime('')
                setDepartureTime('')
                setAvailableSeats(0)
                setBusJourneyDate('')
                setBusName('')
                setBusRegNumber('')
                setDriverName('')
                setFarePerSeat(0)
                setBusType()
                setTotalSeats(0)
                setTrackingURL('')
                setSelectedRouteId('')
            })
            .catch(error => {
                console.error("Error received from add bus API:", error);
                alert("Error adding bus!")
                // Handle error, show error message
            });
    };


    return (
        <div className='container' style={{ backgroundColor: '#f0f8ff', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <div className='card' style={{ backgroundColor: '#add8e6', marginLeft: "200px", marginTop: '40px', marginRight: '200px', borderRadius: '10px', padding: '20px', boxShadow: '0 30px 50px rgba(0, 0, 0, 0.1)' }}>
                <h2 className="text-center" style={{ color: '#fff', padding: '15px 0', borderRadius: '15px 15px 0 0', backgroundColor: '#007bff' }}>Add Bus</h2>
                <div className="card-body" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '20px' }}>
                    <div className="column" style={{ flexBasis: '30%' }}>
                        <div className="form-group">
                            <label htmlFor="busName" style={{ color: 'black' }}>Bus Name</label>
                            <input type="text" className="form-control" id="busName" value={busName} onChange={e => setBusName(e.target.value)} placeholder="Enter the Bus Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="driverName" style={{ color: 'black' }}>Driver Name</label>
                            <input type="text" className="form-control" id="driverName" value={driverName} onChange={e => setDriverName(e.target.value)} placeholder="Enter the Driver Name" />
                        </div>
                        <div className="form-group" style={{ color: 'black' }}>
                            <label>Bus Type:</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="busType" id="ac" value="AC" checked={busType === 'AC'} onChange={() => setBusType('AC')} />
                                <label className="form-check-label" htmlFor="ac">AC</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="busType" id="non-ac" value="Non-AC" checked={busType === 'Non-AC'} onChange={() => setBusType('Non-AC')} />
                                <label className="form-check-label" htmlFor="non-ac">Non-AC</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="busRegNumber" style={{ color: 'black' }}>Bus Registration Number</label>
                            <input type="text" className="form-control" id="busRegNumber" value={busRegNumber} onChange={e => setBusRegNumber(e.target.value)} placeholder="Enter the registered number of bus" />
                        </div>
                    </div>
                    <div className="column" style={{ flexBasis: '30%' }}>
                        <div className="form-group">
                            <label htmlFor="arrivalTime" style={{ color: 'black' }}>Arrival Time</label>
                            <input type="time" className="form-control" id="arrivalTime" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="departureTime" style={{ color: 'black' }}>Departure Time</label>
                            <input type="time" className="form-control" id="departureTime" value={departureTime} onChange={e => setDepartureTime(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="totalSeats" style={{ color: 'black' }}>Total Seats</label>
                            <input type="number" className="form-control" id="totalSeats" value={totalSeats} onChange={e => setTotalSeats(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="availableSeats" style={{ color: 'black' }}>Available Seats</label>
                            <input type="number" className="form-control" id="availableSeats" value={availableSeats} onChange={e => setAvailableSeats(e.target.value)} />
                        </div>
                    </div>
                    <div className="column" style={{ flexBasis: '30%' }}>
                        <div className="form-group">
                            <label htmlFor="farePerSeat" style={{ color: 'black' }}>Fare Per Seat</label>
                            <input type="number" className="form-control" id="farePerSeat" value={farePerSeat} onChange={e => setFarePerSeat(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="trackingURL" style={{ color: 'black' }}>Tracking URL</label>
                            <input type="text" className="form-control" id="trackingURL" value={trackingURL} onChange={e => setTrackingURL(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="busJourneyDate" style={{ color: 'black' }}>Bus Journey Date</label>
                            <input type="date" className="form-control" id="busJourneyDate" value={busJourneyDate} onChange={e => setBusJourneyDate(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="selectedRoute" style={{ color: 'black' }}>Select the available route</label>
                            <select className="form-control" onChange={handleRouteChange} value={selectedRouteId}>
                                <option value="">Source - Destination</option>
                                {routes.map(route => (
                                    <option key={route.routeid} value={route.routeid}>
                                        {`${route.routeFrom} - ${route.routeTo}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" onClick={saveBus} className="btn btn-primary" style={{ width: '100%', margin: '20px auto', display: 'block' }}>Save Bus</button>
                </div>
            </div>
        </div>
    );
};

export default BusComponent;
