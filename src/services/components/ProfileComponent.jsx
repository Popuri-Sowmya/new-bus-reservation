import React, { useState, useEffect } from 'react';
import '../styles/ProfileComponent.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BookingService from '../services/BookingService';
import UserService from '../services/UserService';
import '../styles/Table.css';

const ProfileComponent = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [bookings, setBookings] = useState([]);
    const [showBookings, setShowBookings] = useState(false);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [showFilteredBookings, setShowFilteredBookings] = useState(false);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [userName, setUserName] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');

    const handleUpdateProfile = () => {
        console.log("handleUpdateProfile called..")
        setShowUpdateProfile(true);
        setShowBookings(false);
        setShowFilteredBookings(false);
    }

    const updateUser = (e, userid) => {
        e.preventDefault();
        console.log("updateUser called...");
        const roles = 'ROLE_USER';
        const password = user.password
        const updatedUser = { userName, gender, password, mobileNumber, email, roles };
        console.log("updated User received from form", updatedUser);
        console.log("update user triggered....");
        UserService.updateUser(userid, updatedUser)
            .then((response) => {
                console.log("Response received from route update API...", response.data);
                window.alert("User updated successfully!");
            })
            .catch(error => {
                console.log("error received from route update api...", error);
                window.alert("An error occurred while updating the user.");
            });
    }

    useEffect(() => {
        console.log("user id inside useEffect..", user.userid)
        UserService.getUserbyid(user.userid, token)
            .then((response) => {
                console.log("data recieved from user getbyid api", JSON.stringify(response.data))
                setUserName(user.userName)
                setGender(user.gender)
                setEmail(user.email)
                setMobileNumber(user.mobileNumber)
                console.log("state variables changed of user API")
            }).catch(error => { console.log("error recieved from route api...", error) })
    }, [])

    const renderUpdateProfile = () => {
        console.log("renderUpdateProfile called..")
        return (
            <div className='container' style={{ backgroundColor: '#f0f8ff', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                {console.log("Application rendered..")}
                <div className='card' style={{ backgroundColor: '#add8e6', marginLeft: "350px", marginTop: '40px', marginRight: '200px', borderRadius: '10px', padding: '20px', boxShadow: '0 30px 50px rgba(0, 0, 0, 0.1)' }}>
                    <br />
                    <h2 style={{ color: 'black', textAlign: 'center' }}>Update profile</h2>
                    <div className='card-body' style={{ width: "450px" }}>
                        <form onSubmit={(e) => updateUser(e, user.userid)}>
                            <div className="form-group mb-2">
                                <label htmlFor="userName" style={{ color: 'black' }}>Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userName"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="gender" style={{ color: 'black' }}>Gender:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="mobileNumber" style={{ color: 'black' }}>Mobile Number:</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="mobileNumber"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    pattern="[6789]{1}[0-9]{9}"
                                    minLength="10"
                                    maxLength="10"
                                    required
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="email" style={{ color: 'black' }}>Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    const getBookingsforUser = () => {
        console.log("getBookingsforUser called...");
        BookingService.getbyUserid(user.userid, token)
            .then(response => {
                console.log("response received from bookings by users api....", response.data);
                setBookings(response.data);
                setShowBookings(true);
                setShowUpdateProfile(false);
                setShowFilteredBookings(false);
            })
            .catch(error => {
                console.error("Error retrieving users bookings", error);
                window.alert("error fetching booking details");
            });
    }

    const filterFutureBookings = () => {
        console.log("filterFutureBookings called");
        const now = new Date();
        const filtered = bookings.filter(booking => new Date(booking.journeyDate) > now);
        setFilteredBookings(filtered);
        setShowFilteredBookings(true);
        setShowBookings(false);
        setShowUpdateProfile(false);
    }

    const cancelBooking = (bookingId) => {
        console.log("cancelBooking called...")
        const confirmed = window.confirm("Are you sure you want to cancel the booking?");
        if (!confirmed) {
            return; 
        }
        const cancelBooking = getBookingById(bookingId,token);
        cancelBooking.bookingStatus = 'cancelled';
        const seatsnow = cancelBooking.noOfSeatsBooked + cancelBooking.busDTO.availableSeats;
        cancelBooking.busDTO.availableSeats = seatsnow;
        console.log("cancelBooking before putting in API", cancelBooking);
        BookingService.updateBooking(bookingId, cancelBooking, token)
            .then(response => {
                console.log("response from API for cancelBooking method in profile....", response.data);
                window.alert("Ticket cancelled successfully");
            })
            .catch(error => {
                console.error("Error canceling booking", error);
                window.alert("Error canceling booking");
            });
    }

    const renderBookingsforUser = () => {
        console.log("renderBookingsforUser called...")
        return (
            <div className="bg">
                <div className="table-responsive">
                    <table className="table  table-striped">
                        <thead style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: 'white', borderCollapse: 'separate', borderSpacing: '0', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                            <tr className='table-primary'>
                                <th>Booking Date</th>
                                <th>Source</th>
                                <th>Destination</th>
                                <th>Journey Date</th>
                                <th>Number of seats Booked</th>
                                <th>Journey Cost</th>
                                <th>Bus Name</th>
                                <th>Booking Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, key) => (
                                <tr key={key}>
                                    <td>{booking.bookingDate}</td>
                                    <td>{booking.source}</td>
                                    <td>{booking.destination}</td>
                                    <td>{booking.journeyDate}</td>
                                    <td>{booking.noOfSeatsBooked}</td>
                                    <td>{booking.fare}</td>
                                    <td>{booking.busDTO.busName}</td>
                                    <td>{booking.bookingStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    const getBookingById = (bookingId) => {
        console.log("getBookingById triggered")
        const booking = filteredBookings.find(booking => booking.bookingid === bookingId);
        return booking;
    }

    const renderFilteredBookings = () => {
        console.log("renderFilteredBookings called..")
        return (
            <div className="bg">
                <div className="table-responsive">
                    <table className="table  table-striped">
                        <thead style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: 'white', borderCollapse: 'separate', borderSpacing: '0', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                            <tr className='table-primary'>
                                <th>Booking Date</th>
                                <th>Source</th>
                                <th>Destination</th>
                                <th>Journey Date</th>
                                <th>Number of seats Booked</th>
                                <th>Journey Cost</th>
                                <th>Bus Name</th>
                                <th>Booking Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking, key) => (
                                <tr key={key}>
                                    <td>{booking.bookingDate}</td>
                                    <td>{booking.source}</td>
                                    <td>{booking.destination}</td>
                                    <td>{booking.journeyDate}</td>
                                    <td>{booking.noOfSeatsBooked}</td>
                                    <td>{booking.fare}</td>
                                    <td>{booking.busDTO.busName}</td>
                                    <td>{booking.bookingStatus}</td>
                                    <td>
                                        <button
                                            onClick={() => cancelBooking(booking.bookingid)}
                                            className="btn btn-danger"
                                            disabled={booking.bookingStatus === 'cancelled'}>
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="operator-interface">
            <div className="sidebar">
                <ul>
                    <button className='headbtn' onClick={handleUpdateProfile}>
                        Update Profile
                    </button>
                </ul>
                <hr style={{color:'white'}}/>
                <ul>
                    <button className='headbtn' onClick={getBookingsforUser}>
                        My Bookings
                    </button>
                </ul>
                <hr style={{color:'white'}}/>
                <ul>
                    <button className='headbtn' onClick={filterFutureBookings}>
                        Cancel tickets
                    </button>
                </ul>
            </div>
            <div className="rolecontent">
                {showBookings && renderBookingsforUser()}
                {showFilteredBookings && renderFilteredBookings()}
                {showUpdateProfile && renderUpdateProfile()}
            </div>
        </div>
    );
};

export default ProfileComponent;
