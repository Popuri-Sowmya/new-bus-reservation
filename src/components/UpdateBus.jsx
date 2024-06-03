import React, { useState, useEffect } from 'react';
import BusService from '../services/BusService.jsx';
import RouteService from '../services/RouteService.jsx';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdateBus = () => {
    const [routes, setRoutes] = useState([]);
    const navigate = useNavigate();
    const [busName, setBusName] = useState(''); // Define state variables and setters
    const [driverName, setDriverName] = useState('');
    const [busType, setBusType] = useState('AC');
    const [busRegNumber, setBusRegNumber] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [totalSeats, setTotalSeats] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [farePerSeat, setFarePerSeat] = useState('');
    const [busJourneyDate, setBusJourneyDate] = useState('');
    const [trackingURL, setTrackingURL] = useState('');
    const [selectedRouteId, setSelectedRouteId] = useState('');
    const { id } = useParams()
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        console.log("use effect triggered..")
        fetchRoutes();
        console.log("id value recieved from url using useParams", id)
        if (id) {
            BusService.getBusbyId(id,token)
                .then((response) => {
                    console.log("data recieved from getbyid api", JSON.stringify(response.data))
                    setBusName(response.data.busName)
                    setDriverName(response.data.driverName)
                    setBusType(response.data.busType)
                    setBusRegNumber(response.data.busRegNumber)
                    setArrivalTime(response.data.arrivalTime)
                    setDepartureTime(response.data.departureTime)
                    setTotalSeats(response.data.totalSeats)
                    setAvailableSeats(response.data.availableSeats)
                    setFarePerSeat(response.data.farePerSeat)
                    setBusJourneyDate(response.data.busJourneyDate)
                    setTrackingURL(response.data.trackingURL)
                    setSelectedRouteId(response.data.route.routeid.toString());
                    console.log("state variables changed")
                }).catch(error => { console.log("error recieved from api...", error) })
        }
    }, [])

    const handleRouteChange = event => {
        setSelectedRouteId(event.target.value);
    };

    const fetchRoutes = () => {
        RouteService.getAllRoutes()
            .then(response => {
                setRoutes(response.data);
            })
            .catch(error => {
                console.error("Error fetching routes:", error);
            });
    };


    const saveBus = (e) => {
        e.preventDefault();
        // Your logic for saving the bus goes here
        console.log("Bus saved!");
        console.log("selectedrouteid..",selectedRouteId)
        const route = routes.find(route => route.routeid === parseInt(selectedRouteId));
        console.log("route before saving..",route)
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
        console.log("bus received from for update", bus);

        BusService.updateBus(id, bus, token)
            .then(response => {
                console.log("Response received from update bus API:", response.data);
                alert("Bus updated successfully!");
                navigate("/operatorui")
            })
            .catch(error => {
                console.error("Error received from update bus API:", error);
                alert("Error updating bus!");
            });

    };

    return (
        <div className='container' style={{ backgroundColor: '#f0f8ff', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {console.log("Application rendered..")}
        <div className='container' style={{ maxWidth: '600px' }}>
            <div className='card' style={{ backgroundColor: '#add8e6', borderRadius: '10px', padding: '20px', boxShadow: '0 30px 50px rgba(0, 0, 0, 0.1)' }}>
                <h2 className='text-center' style={{ color: 'black' }}>Update Bus</h2>
                <div className='card-body'>
                    <form>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label className='form-label' htmlFor="busName" style={{ color: 'black' }}>Bus Name</label>
                                    <input type="text" placeholder="Enter the Bus Name" className="form-control" id="busName" name="busName" value={busName} onChange={(e) => { setBusName(e.target.value) }} />
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor="driverName" style={{ color: 'black' }}>Driver Name</label>
                                    <input type="text" placeholder="Enter the Driver Name" className="form-control" id="driverName" name="driverName" value={driverName} onChange={(e) => { setDriverName(e.target.value) }} />
                                </div>
                                <div className="form-group">
                                    <label className='form-label' style={{ color: 'black' }}>Bus Type:</label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="busType" id="ac" value="AC" checked={busType === 'AC'} onChange={(e) => setBusType('AC')} />
                                        <label className="form-check-label" htmlFor="ac" style={{ color: 'black' }}>
                                            AC
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="busType" id="non-ac" value="Non-AC" checked={busType === 'Non-AC'} onChange={(e) => setBusType('Non-AC')} />
                                        <label className="form-check-label" htmlFor="non-ac" style={{ color: 'black' }}>
                                            Non-AC
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor="busRegNumber" style={{ color: 'black' }}>Bus Registration Number</label>
                                    <input type="text" placeholder="Enter the registered number of bus" className="form-control" id="busRegNumber" name="busRegNumber" value={busRegNumber} onChange={(e) => { setBusRegNumber(e.target.value) }} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label className='form-label' htmlFor="arrivalTime" style={{ color: 'black' }}>Arrival Time</label>
                                    <input type="time" className="form-control" id="arrivalTime" name="arrivalTime" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor="departureTime" style={{ color: 'black' }}>Departure Time</label>
                                    <input type="time" className="form-control" id="departureTime" name="departureTime" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor="totalSeats" style={{ color: 'black' }}>Total Seats</label>
                                    <input type="number" className="form-control" id="totalSeats" name="totalSeats" value={totalSeats} onChange={(e) => setTotalSeats(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor="availableSeats" style={{ color: 'black' }}>Available Seats</label>
                                    <input type="number" className="form-control" id="availableSeats" name="availableSeats" value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label className='form-label' htmlFor="farePerSeat" style={{ color: 'black' }}>Fare Per Seat</label>
                                    <input type="number" className="form-control" id="farePerSeat" name="farePerSeat" value={farePerSeat} onChange={(e) => setFarePerSeat(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor="busJourneyDate" style={{ color: 'black' }}>Bus Journey Date</label>
                                    <input type="date" className="form-control" id="busJourneyDate" name="busJourneyDate" value={busJourneyDate} onChange={(e) => setBusJourneyDate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor="trackingURL" style={{ color: 'black' }}>Tracking URL</label>
                                    <input type="text" className="form-control" id="trackingURL" name="trackingURL" value={trackingURL} onChange={(e) => setTrackingURL(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className='form-label' htmlFor="selectedRoute" style={{ color: 'black' }}>Select the available route</label>
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
                        </div>
                        <button onClick={(e) => saveBus(e)} type="submit" className="btn btn-primary" style={{ width: '100%' }}>Update Bus</button>
                    </form>
                </div>
            </div>
        </div>
    </div>    
    );
}

export default UpdateBus;
