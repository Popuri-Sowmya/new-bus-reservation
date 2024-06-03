import React, { useState, useEffect } from 'react';
import RouteService from '../services/RouteService.jsx';
import '../styles/RouteComponent.css';
import { useSelector } from 'react-redux';

const RouteComponent = () => {
    const [routes, setRoutes] = useState([]);
    const [routeArray, setRouteArray] = useState([])
    const [routeFrom, setRouteFrom] = useState([''])
    const [routeTo, setRouteTo] = useState([''])
    const [distance, setDistance] = useState([0])
    const token = useSelector((state) => state.auth.token);

    console.log("token recieved from authReducer..",token)

    const saveRoute = e => {
        e.preventDefault();
        const route = {
            routeFrom,
            routeTo,
            distance
        };
        RouteService.addRoute(route,token)
            .then(response => {
                console.log("Response received from add route API:", response.data);
                alert("Route added successfully!");
                setRouteFrom('')
                setRouteTo('')
                setDistance(0)
            })
            .catch(error => {
                console.error("Error received from add route API:", error);
                alert("Error saving route!");
            });
    };
    const handleCancel = () => {
        window.history.back();
    };

    return (
        <div className='container' style={{ backgroundColor: '#f0f8ff', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <div className='card' style={{ backgroundColor: '#add8e6', marginLeft: "300px", marginTop: '40px', marginRight: '200px', borderRadius: '10px', padding: '20px', boxShadow: '0 30px 50px rgba(0, 0, 0, 0.1)' }}>
                <h2 className="text-center" style={{ color: 'black' }}>Add Route</h2>
                <div className="card-body margin-top=2px">
                    <form onSubmit={saveRoute} className="two-column-form">
                        <div className="column">
                            <div className="form-group">
                                <label htmlFor="routeFrom" className="label-width" style={{ color: 'black' }}>Route From</label>
                                <input type="text" className="form-control" id="routeFrom" value={routeFrom} onChange={e => setRouteFrom(e.target.value)} placeholder="Enter the Route From " />
                            </div>
                            <div className="form-group">
                                <label htmlFor="routeTo" className="label-width" style={{ color: 'black' }}>Route To</label>
                                <input type="text" className="form-control" id="routeTo" value={routeTo} onChange={e => setRouteTo(e.target.value)} placeholder="Enter the Route To" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="distance" className="label-width" style={{ color: 'black' }}>Distance</label>
                                <input type="text" className="form-control" id="distance" value={distance} onChange={e => setDistance(e.target.value)} placeholder="Enter the Distance" />
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-primary btn-block">Save Route</button>
                                </div>
                                <div className="col-sm-6">
                                    <button type="button" className='btn btn-danger btn-block' onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default RouteComponent;