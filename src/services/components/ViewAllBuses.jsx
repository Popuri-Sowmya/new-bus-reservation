import React, { useState, useEffect } from 'react';
import BusService from '../services/BusService.jsx';
import { Link, useNavigate } from 'react-router-dom'; // Import Link component
import { useSelector } from 'react-redux';
import '../styles/Table.css';
// import '../styles/BusComponent.css';

export const ViewAllBuses = ({ onClose }) => {
    const [busList, setBusList] = useState([]);
    const [updatedBusData, setUpdatedBusData] = useState({});
    const navigate=useNavigate();
    const token = useSelector((state) => state.auth.token);

   const onUpdateBus=()=>{
    navigate("/updatebus/:id");
   }

    useEffect(() => {
        // Fetch buses
        BusService.getAllBuses(token)
            .then(response => {
                setBusList(response.data);
                console.log("State variable for getAll changed...");
                console.log("response received from API for getAll", response.data);
            })
            .catch(error => {
                console.error("Error fetching buses:", error);
            });
    }, []);

    const deleteBus = (busId) => {
        // Delete the bus with the given ID
        BusService.deleteBus(busId,token)
            .then(() => {
                // Remove the bus from the list
                setBusList(prevList => prevList.filter(bus => bus.busid !== busId));
                console.log("Bus deleted successfully.");
                alert("Bus deleted successfully!")
            })
            .catch(error => {
                console.error("Error deleting bus:", error);
                alert("Error deleting bus!")
            });
    };

    return (
        <div className="bg">
            <div className="table-responsive">
                <table className="table  table-striped">
                    <thead style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: 'white', borderCollapse: 'separate', borderSpacing: '0', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                        <tr className='table-primary'>
                            <th>Bus Id</th>
                            <th>Bus Name</th>
                            <th>Driver Name</th>
                            <th>Bus Type</th>
                            <th>Bus Registration Number</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Arrival Time</th>
                            <th>Departure Time</th>
                            <th>Total Seats</th>
                            <th>Available seats</th>
                            <th>Price per Seat</th>
                            <th>Journey Date</th>
                            <th>Tracking URL</th>
                            <th>Route</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {busList.map((bus, key) => (
                            <tr key={key}>
                                <td>{bus.busid}</td>
                                <td>{bus.busName}</td>
                                <td>{bus.driverName}</td>
                                <td>{bus.busType}</td>
                                <td>{bus.busRegNumber}</td>
                                <td>{bus.routeFrom}</td>
                                <td>{bus.routeTo}</td>
                                <td>{bus.arrivalTime}</td>
                                <td>{bus.departureTime}</td>
                                <td>{bus.totalSeats}</td>
                                <td>{bus.availableSeats}</td>
                                <td>{bus.farePerSeat}</td>
                                <td>{bus.busJourneyDate}</td>
                                <td>{bus.trackingURL}</td>
                                <td>{bus.route.routeid}</td>
                                {/* <td>
                                    <button
                                        style={{ backgroundColor: 'green' }}
                                        onClick={() => onUpdateBus()}>
                                        Update
                                    </button>
                                </td> */}
                                 <td><Link to={`/updatebus/${bus.busid}`} className='btn btn-success'>Update</Link></td> 
                                <td>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => deleteBus(bus.busid)}>
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

export default ViewAllBuses;
