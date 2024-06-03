import React, { useContext, useEffect } from 'react';
import { useState } from "react";
import firstImage from '../utils/Image1.jpg';
import Twenty from '../utils/Twenty.jpeg';
import TravelInsurance from '../utils/TravelInsurance.jpeg';
import specialoffers from '../utils/specialoffers.jpeg';
import BusService from '../services/BusService';
import { useNavigate, Link } from "react-router-dom";
import { SearchBusContext } from './SearchBusContext';
import { useDispatch } from 'react-redux';
import { updateSearchData } from './actions/userActions';
import RouteService from '../services/RouteService';

export function SearchBar() {
    const dispatch = useDispatch();
    const { setSearchBusList } = useContext(SearchBusContext);
    const [serSource, setSerSource] = useState('');
    const [serDest, setSerDest] = useState('');
    const [serbusJourneyDate, setSerBusJourneyDate] = useState('');
    const navigate = useNavigate();
    const [routeFromSet, setRouteFromSet] = useState(new Set());
    const [routeToSet, setRouteToSet] = useState(new Set());

    const fetchSearchBuses = (source, destination, date) => {
        console.log("data received from form", source, destination, date);
        BusService.getBusesbySearch(source, destination, date)
            .then(response => {
                console.log("before set search");
                setSearchBusList(response.data);
                console.log("response received from api....", response.data);
                navigate('/display')
            })
            .catch(error => {
                console.error("Error fetching buses:", error);
            });
    };

    useEffect(() => {
        RouteService.getAllRoutes()
            .then(response => {
                const routeFromValues = new Set(response.data.map(route => route.routeFrom));
                const routeToValues = new Set(response.data.map(route => route.routeTo));
                setRouteFromSet(routeFromValues);
                setRouteToSet(routeToValues);
            })
            .catch(error => {
                console.error("Error fetching routes:", error);
            });
    }, [])

    const handleClaimOffer = (offerName) => {
        alert("Hey! you are almost there. Explore ,book and earn more offers now!!!!");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateSearchData(serSource, serDest, serbusJourneyDate));
        fetchSearchBuses(serSource, serDest, serbusJourneyDate);
    };
    return (
        <div>
            {console.log("serch bar triggered")}
            <div className="position-relative">
                <img src={firstImage} alt="Image" className="img-fluid w-100" />
                <div className="position-absolute top-0 start-50 translate-middle p-4 rounded" style={{ zIndex: 1 }}>
                    <h4 className="text-center mb-0" style={{ color: "black", fontWeight: "500", marginTop: "170px", fontFamily: "flix", fontSize: "2rem" }}>India's No. 1 Online Bus Ticket Booking Site</h4>                    {/* <p className="text-center mb-0" style={{ color: "blue", fontWeight: "500", marginTop: "170px" }}>Book your bus journey with FastX<br />Now travel at a Low Cost</p> */}
                </div>
                <div className="search-container position-absolute top-0 start-50 translate-middle p-4 rounded border border-primary bg-white" style={{ zIndex: 1, maxWidth: "800px", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)", marginTop: "250px" }}>
                    <div className="container">
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-md-3 position-relative">
                                <label htmlFor="routeFrom" className="form-label">From</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="routeFrom"
                                    placeholder="Enter From"
                                    value={serSource}
                                    onChange={(e) => setSerSource(e.target.value)}
                                    autoComplete="off"
                                    list="fromList"
                                />
                                <datalist id="fromList">
                                    {[...routeFromSet].map(routeFrom => (
                                        <option key={routeFrom} value={routeFrom}/>
                                    ))}
                                </datalist>
                            </div>
                            <div className="col-md-3 position-relative">
                                <label htmlFor="routeTo" className="form-label">To</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="routeTo"
                                    placeholder="Enter To"
                                    value={serDest}
                                    onChange={(e) => setSerDest(e.target.value)}
                                    autoComplete="off"
                                    list="toList"
                                />
                                <datalist id="toList" className="custom-datalist">
                                    {[...routeToSet].map(routeTo => (
                                        <option key={routeTo} value={routeTo} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="bookingDate" className="form-label">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="bookingDate"
                                    value={serbusJourneyDate}
                                    onChange={(e) => setSerBusJourneyDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div className="col-md-3 d-flex align-items-end">
                                <button type="submit" className="btn btn-primary w-100">Search Buses</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="container mt-5">
                    <h2 className="text-center">Why Choose FastX for Bus Ticket Booking?</h2>
                    <p className="text-center">FastX is India's fastest growing online ticket booking platform. FastX is the official ticketing partner of several State Road Transport Corporation (SRTC) operators and over 3500+ private bus partners covering more than 100,000 bus routes</p>
                    <div className="row mt-5">
                        <div className="col-md-3 mb-4">
                            <div className="card">
                                <div className="card border-info">
                                    <div border-primary className="card-body">
                                        <h5 className="card-title">1,00,000+ Bus Routes</h5>
                                        <p className="card-text">Offering unparalleled choices for your travel needs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="card border-info">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">3500+ Bus Partners</h5>
                                        <p className="card-text">Ranging from State RTCs to private partners</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="card border-info">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Fastest Bus Booking</h5>
                                        <p className="card-text">Swift and seamless bus ticket booking experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="card border-info">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">24/7 Customer Support</h5>
                                        <p className="card-text">Available for all your bus booking needs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <h2 className="text-center">Special Offers</h2>
                    <div className="row mt-5 d-flex justify-content-center">
                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src={Twenty} className="card-img-top" alt="Offer 1" />
                                <div className="card-body">
                                    <h5 className="card-title">20% offer</h5>
                                    <p className="card-text">Get 20% off on your first booking.</p>
                                    <button className="btn btn-info" onClick={handleClaimOffer}>Claim now</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src={specialoffers} className="card-img-top" alt="Offer 2" />
                                <div className="card-body">
                                    <h5 className="card-title">Rs.100 cashback</h5>
                                    <p className="card-text">Enjoy flat Rs. 100 cashback on every booking.</p>
                                    <button className="btn btn-info" onClick={handleClaimOffer}>Claim now</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src={TravelInsurance} className="card-img-top" alt="Offer 3" />
                                <div className="card-body">
                                    <h5 className="card-title">Travel Insurance</h5>
                                    <p className="card-text">Get free travel insurance on bookings above Rs. 500.</p>
                                    <button className="btn btn-info" onClick={handleClaimOffer}>Claim now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default SearchBar;