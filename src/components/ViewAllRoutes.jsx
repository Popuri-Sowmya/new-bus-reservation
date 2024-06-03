import React, { useState, useEffect } from 'react';
import RouteService from '../services/RouteService.jsx';
import { Link, useNavigate } from 'react-router-dom'; // Import Link component
import { useSelector } from 'react-redux';
import '../styles/Table.css';
// import '../styles/BusComponent.css';

const ViewAllRoutes = () => {
    const [routeList, setRouteList] = useState([]);
    const [updatedRouteData, setUpdatedRouteData] = useState({});
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const onUpdateRoute = () => {
        navigate("/updateroute/:id");
    }

    useEffect(() => {
        // Fetch buses
        RouteService.getAllRoutes()
            .then(response => {
                setRouteList(response.data);
                console.log("State variable for getAll changed...");
                console.log("response received from API for getAll", response.data);
            })
            .catch(error => {
                console.error("Error fetching routes:", error);
            });
    }, []);

    const deleteRoute = (routeId) => {
        // Delete the bus with the given ID
        RouteService.deleteRoute(routeId,token)
            .then(() => {
                // Remove the bus from the list
                setRouteList(prevList => prevList.filter(route => route.routeid !== routeId));
                console.log("Route deleted successfully.");
                alert("Route deleted successfully!")
            })
            .catch(error => {
                console.error("Error deleting route:", error);
                alert("Error deleting route!")
            });
    };




    return (
        <div className="bg">
      <div className="table-responsive">
        <table className="table  table-striped">
          <thead style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: 'white', borderCollapse: 'separate', borderSpacing: '0', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                        <tr className='table-primary'>
                            <th>Route Id</th>
                            <th>Route From</th>
                            <th>Route To</th>
                            <th>Distance</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routeList.map((route, key) => (
                            <tr key={key}>
                                <td>{route.routeid}</td>
                                <td>{route.routeFrom}</td>
                                <td>{route.routeTo}</td>
                                <td>{route.distance}</td>
                                <td><Link to={`/updateroute/${route.routeid}`} className='btn btn-success' style={{ color: '#fff' }}>Update</Link></td>
                                <td>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => deleteRoute(route.routeid)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>           
    );
};

export default ViewAllRoutes;
