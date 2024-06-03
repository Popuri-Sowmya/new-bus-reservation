import React, { useState, useEffect } from 'react';
import OperatorService from '../services/OperatorService.jsx';
import { Link, useNavigate } from 'react-router-dom'; // Import Link component
import { useSelector } from 'react-redux';
import '../styles/Table.css';

const ViewAllOperators = () => {
    const [operatorList, setOperatorList] = useState([]);
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const onUpdateOperator = (operatorId) => {
        navigate("/update/" + operatorId);
    }

    useEffect(() => {
        // Fetch buses
        console.log("token inside view all operators..", token)
        OperatorService.getAllOperators(token)
            .then(response => {
                setOperatorList(response.data);
                console.log("State variable for getAll changed...");
                console.log("response received from API for getAll", response.data);
            })
            .catch(error => {
                console.error("Error fetching routes:", error);
            });
    }, []);

    const deleteOperator = (operatorId) => {
        // Delete the bus with the given ID
        OperatorService.deleteOperator(operatorId, token)
            .then(() => {
                // Remove the bus from the list
                setOperatorList(prevList => prevList.filter(operator => operator.operatorid !== operatorId));
                console.log("Operator deleted successfully.");
            })
            .catch(error => {
                console.error("Error deleting operator:", error);
            });
    };

    return (
        <div className="bg">
            <div className="table-responsive">
                <table className="table  table-striped">
                    <thead style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: 'white', borderCollapse: 'separate', borderSpacing: '0', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                        <tr className='table-primary'>
                            <th>Operator Id</th>
                            <th>Operator Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Update</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {operatorList.map((operator, key) => (
                            <tr key={key}>
                                <td>{operator.operatorid}</td>
                                <td>{operator.operatorName}</td>
                                <td>{operator.email}</td>
                                <td>{operator.mobileNumber}</td>
                                <td>
                                    <button
                                        className='btn btn-success'
                                        onClick={() => onUpdateOperator(operator.operatorid)}>
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => deleteOperator(operator.operatorid)}>
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

export default ViewAllOperators;
