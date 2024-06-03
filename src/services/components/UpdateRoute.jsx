import React, { useState, useEffect } from 'react';
import RouteService from '../services/RouteService';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdateRoute = () => {
    const [routeFrom, setRouteFrom] = useState('');
    const [routeTo, setRouteTo] = useState('');
    const [distance, setDistance] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();
    const token = useSelector((state) => state.auth.token);

    const handleCancel = () => {
        window.history.back(); // Go back to the previous page
        navigate("/adminui")
    };

    useEffect(() => {
        console.log("use effect triggered..");
        console.log("id value received from URL using useParams", id);
        if (id) {
            RouteService.getRouteById(id,token)
                .then((response) => {
                    console.log("data received from getbyid api", JSON.stringify(response.data));
                    setRouteFrom(response.data.routeFrom);
                    setRouteTo(response.data.routeTo);
                    setDistance(response.data.distance);
                    console.log("state variables changed");
                })
                .catch(error => { console.log("error received from API...", error); });
        }
    }, [id]);

    const saveRoute = (e) => {
        e.preventDefault();
        // Your logic for saving the route goes here
        console.log("Route saved!");
        const route = {
            routeFrom: routeFrom,
            routeTo: routeTo,
            distance: distance
        };
        console.log("Route received for update", route);

        RouteService.updateRoute(id, route,token)
            .then(response => {
                console.log("Response received from update route API:", response.data);
                alert("Route updated successfully!");
                navigate("/adminui")
            })
            .catch(error => {
                console.error("Error received from update route API:", error);
                alert("Error updating route!")
            });
    };

    return (
        <div>
            <div className='container' style={{ backgroundColor: '#f0f8ff', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                {console.log("Application rendered..")}
                <br/>
                <br/>
                <div className='card' style={{ backgroundColor: '#add8e6', marginLeft: "450px", marginRight: '450px', borderRadius: '10px', padding: '20px', boxShadow: '0 30px 50px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-center'>Update Route</h2>
                        <div className='card-body'>
                            <form>
                                <div className="form-group mb-2">
                                    <label className='form-label' htmlFor="routeFrom">Route From</label>
                                    <input type="text" placeholder="Enter the Route From"
                                        className="form-control" id="routeFrom" name="routeFrom" value={routeFrom}
                                        onChange={(e) => { setRouteFrom(e.target.value) }} />
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label' htmlFor="routeTo">Route To</label>
                                    <input type="text" placeholder="Enter the Route To"
                                        className="form-control" id="routeTo" name="routeTo" value={routeTo}
                                        onChange={(e) => { setRouteTo(e.target.value) }} />
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label' htmlFor="distance">Distance</label>
                                    <input type="text" placeholder=""
                                        className="form-control" id="distance" name="distance" value={distance}
                                        onChange={(e) => { setDistance(e.target.value) }} />
                                </div>
                                <div className="form-group row">
                            <div className="col-sm-6">
                                <button onClick={(e) => saveRoute(e)}type="submit" className="btn btn-primary btn-block">Save Route</button>
                            </div>
                            <div className="col-sm-6">
                            <button type="button" className='btn btn-danger btn-block' onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default UpdateRoute;