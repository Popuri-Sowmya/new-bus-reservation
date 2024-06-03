import React, { useState } from 'react';
import RouteComponent from"./RouteComponent";
import ViewAllRoutes from"./ViewAllRoutes";
import ViewAllUsers from"./ViewAllUsers";
import '../styles/OperatorInterface.css';
import OperatorComponent from './OperatorComponent';
import ViewAllOperators from './ViewAllOperators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const AdminInterface = () => {
    const [showRoutes, setShowRoutes] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showOperators, setShowOperators] = useState(false);
    const [showRouteComponent, setRouteComponent] = useState(false);
    const [showViewAllRoutes, setViewAllRoutes] = useState(false);
    const [showViewAllUsers,setViewAllUsers]=useState(false);
    const [showOperatorComponent,setOperatorComponent]=useState(false);
    const [showViewAllOperators,setViewAllOperators]=useState(false);

    console.log("before render adminui")

    const toggleUsers = () => {
        setShowUsers(!showUsers);
        setViewAllUsers(false);
    };

    const toggleRoutes = () => {
        setShowRoutes(!showRoutes);
        setRouteComponent(false);
        setViewAllRoutes(false);
    };

    const toggleOperators = () => {
        setShowOperators(!showOperators);
        setOperatorComponent(false);
        setViewAllOperators(false);
    };

    const handleAddRouteClick = () => {
        setRouteComponent(true);
        setViewAllRoutes(false);
        setViewAllUsers(false);
        setOperatorComponent(false);
        setViewAllOperators(false);
    };
    const handleViewRouteClick = () => {
        setRouteComponent(false);
        setViewAllRoutes(true);
        setViewAllUsers(false);
        setOperatorComponent(false);
        setViewAllOperators(false);
    };
    const handleViewUserClick = () => {
        setRouteComponent(false);
        setViewAllRoutes(false);
        setViewAllUsers(true);
        setOperatorComponent(false);
        setViewAllOperators(false);
    };
    const handleAddOperatorClick = () => {
        setRouteComponent(false);
        setViewAllRoutes(false);
        setViewAllUsers(false);
        setOperatorComponent(true);
        setViewAllOperators(false);
    };
    const handleViewOperatorClick = () => {
        setRouteComponent(false);
        setViewAllRoutes(false);
        setViewAllUsers(false);
        setOperatorComponent(false);
        setViewAllOperators(true);
    };

    return (
        <div className="operator-interface">
            {console.log("inside admin interface")}
            <div className="sidebar">
                <ul>
                    <button className='headbtn' onClick={toggleRoutes}>
                        Manage Routes &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<FontAwesomeIcon icon={showRoutes ? faCaretUp : faCaretDown} />
                    </button>
                    {showRoutes && (
                        <>
                            <li>
                                <button class='listbtn' onClick={handleAddRouteClick}>Add Route</button>
                            </li>
                            <hr style={{color:"white"}} />
                            <li>
                                <button class='listbtn' onClick={handleViewRouteClick}>View All Routes</button>
                            </li>
                        </>
                    )}
                </ul>
                <hr style={{color:"white"}} />
                <ul>
                    <button className='headbtn' onClick={toggleUsers}>
                        Manage Users &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<FontAwesomeIcon icon={showUsers ? faCaretUp : faCaretDown} />
                    </button>
                    {showUsers && (
                        <>
                            <li>
                                <button class='listbtn' onClick={handleViewUserClick}>View Users</button>
                            </li>
                        </>
                    )}
                </ul>
                <hr style={{color:"white"}} />
                <ul>
                    <button className='headbtn' onClick={toggleOperators}>
                        Manage Operators &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<FontAwesomeIcon icon={showOperators ? faCaretUp : faCaretDown} />
                    </button>
                    {showOperators && (
                        <>
                            <li>
                                <button class='listbtn' onClick={handleAddOperatorClick}>Add Operator</button>
                            </li>
                            <hr style={{color:"white"}} />
                            <li>
                                <button class='listbtn' onClick={handleViewOperatorClick}>View All Operators</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className='rolecontent'>
            {showRouteComponent && <RouteComponent onClose={() => setRouteComponent(false)} />}
            {showViewAllRoutes && <ViewAllRoutes onClose={() => setViewAllRoutes(false)} />}
            {showViewAllUsers && <ViewAllUsers onClose={() => setViewAllUsers(false)} />}
            {showOperatorComponent && <OperatorComponent onClose={() => setOperatorComponent(false)} />}
            {showViewAllOperators && <ViewAllOperators onClose={() => setViewAllOperators(false)} />}
            </div>
        </div>
    );
};

export default AdminInterface;