import React, { useState } from 'react';
import BusComponent from "./BusComponent";
import ViewAllBuses from "./ViewAllBuses";
import UpdateBus from "./UpdateBus";
import '../styles/OperatorInterface.css';
import ViewAllBookings from './ViewAllBookings';
import ViewCanceledBookings from './ViewCanceledBookings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const OperatorInterface = () => {
    const [showBuses, setShowBuses] = useState(false);
    const [showBookings, setShowBookings] = useState(false);
    const [showBusComponent, setBusComponent] = useState(false);
    const [showViewAllBuses, setViewAllBuses] = useState(false);
    const [showViewAllBookings, setViewAllBookings] = useState(false);
    const [showCancelBookings, setCancelBookings] = useState(false);

    const toggleBuses = () => {
        setShowBuses(!showBuses);
        setBusComponent(false);
        setViewAllBuses(false);
    };

    const toggleBookings = () => {
        setShowBookings(!showBookings);
        setViewAllBookings(false);
        setCancelBookings(false);
    };

    const handleAddBusClick = () => {
        setBusComponent(true);
        setViewAllBuses(false);
        setViewAllBookings(false);
        setCancelBookings(false);
    };
    const handleAddBusClick1 = () => {
        setViewAllBuses(true);
        setBusComponent(false);
        setViewAllBookings(false);
        setCancelBookings(false);
    };
    const handleAllBookings = () => {
        setViewAllBuses(false);
        setBusComponent(false);
        setViewAllBookings(true);
        setCancelBookings(false);
    }
    const handleCancelBookings = () => {
        setViewAllBuses(false);
        setBusComponent(false);
        setViewAllBookings(false);
        setCancelBookings(true);
    }

    return (
        <div className="operator-interface">
            <div className="sidebar">
                <ul>
                    <button className='headbtn' onClick={toggleBuses}>
                        Manage Buses &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<FontAwesomeIcon icon={showBuses ? faCaretUp : faCaretDown} />
                    </button>
                    {showBuses && (
                        <>
                            <li>
                                <button class='listbtn' onClick={handleAddBusClick}>Add Bus</button>
                            </li>
                            <hr style={{color:"white"}} />
                            <li>
                                <button class='listbtn' onClick={handleAddBusClick1}>View All Buses</button>
                            </li>
                        </>
                    )}
                </ul>
                <hr style={{color:"white"}} />
                <ul>
                    <button className='headbtn' onClick={toggleBookings}>
                        Manage Bookings &nbsp; &nbsp; &nbsp; &nbsp;<FontAwesomeIcon icon={showBookings ? faCaretUp : faCaretDown} />
                    </button>
                    {showBookings && (
                        <>
                            <li>
                                <button class='listbtn' onClick={handleAllBookings}>View All Bookings</button>
                            </li>
                            <hr style={{color:"white"}} />
                            <li>
                                <button class='listbtn' onClick={handleCancelBookings}>Refund</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className='rolecontent'>
                {showBusComponent && <BusComponent onClose={() => setBusComponent(false)} />}
                {showViewAllBuses && <ViewAllBuses onClose={() => setViewAllBuses(false)} />}
                {showViewAllBookings && <ViewAllBookings onClose={() => setViewAllBookings(false)} />}
                {showCancelBookings && <ViewCanceledBookings onClose={() => setCancelBookings(false)} />}
            </div>
        </div>
    );
};

export default OperatorInterface;