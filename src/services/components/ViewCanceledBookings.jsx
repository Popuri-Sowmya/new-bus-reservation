import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import BookingService from '../services/BookingService.jsx';
// import '../styles/BusComponent.css';
import { useSelector } from 'react-redux';
// import {updateRefundStatus} from './actions/refundActions'
import '../styles/Table.css';

export const ViewCanceledBookings = () => {

  // const dispatch = useDispatch();
  const [cancelledList, setCancelledList] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    BookingService.getAllBookings(token)
      .then(response => {
        const allBookings = response.data;
        const cancelledBookings = allBookings.filter(booking => booking.bookingStatus === 'cancelled');
        setCancelledList(cancelledBookings);

      })
      .catch(error => {
        console.error("Error fetching bookings:", error);
      });
  }, []);


  const handleRefund = () => {
    window.alert("Refund Approved for this user!")
  };


  return (
    <div className="bg">
      <div className="table-responsive">
        <table className="table  table-striped">
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
              <th>Refund</th>
            </tr>
          </thead>
          <tbody>
            {cancelledList.map((booking, key) => (
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
                <td>
                  <button className='btn btn-primary' onClick={handleRefund}>
                    Refund
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

export default ViewCanceledBookings;
