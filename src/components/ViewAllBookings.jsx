import React, { useState, useEffect } from 'react';
import BookingService from '../services/BookingService.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import '../styles/BusComponent.css';
import '../styles/Table.css';

export const ViewAllBookings = () => {
  const [bookingList, setBookingList] = useState([]);
  const [updatedBookingData, setUpdatedBookingData] = useState({});
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Fetch buses
    BookingService.getAllBookings(token)
      .then(response => {
        setBookingList(response.data);
        console.log("State variable for getAll changed...");
        console.log("response received from API for getAll", response.data);
      })
      .catch(error => {
        console.error("Error fetching routes:", error);
        alert("Error fetching details")
      });
  }, []);

  const canceledBookings = () => {
    return bookingList.filter(booking => booking.bookingStatus === 'cancelled');
  };

  return (
    <div className="bg">
      <div className="table-responsive">
        <table className="table table-striped">
          <thead style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: 'white', borderCollapse: 'separate', borderSpacing: '0', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <tr className='table-primary'>
              <th>Booking Id</th>
              <th>Booking Status</th>
              <th>Booking Date</th>
              <th>Booking Time</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Journey Date</th>
              <th>No of seats booked</th>
              <th>Fare</th>
            </tr>
          </thead>
          <tbody>
            {bookingList.map((booking, key) => (
              <tr key={key}>
                <td>{booking.bookingid}</td>
                <td>{booking.bookingStatus}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.bookingTime}</td>
                <td>{booking.source}</td>
                <td>{booking.destination}</td>
                <td>{booking.journeyDate}</td>
                <td>{booking.noOfSeatsBooked}</td>
                <td>{booking.fare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllBookings;
