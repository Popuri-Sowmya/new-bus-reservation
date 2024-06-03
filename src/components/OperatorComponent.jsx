import React, { useState, useEffect } from 'react';
import OperatorService from '../services/OperatorService.jsx';
import '../styles/RouteComponent.css';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

const OperatorComponent = () => {
    const [operatorName, setOperatorName] = useState([''])
    const [email, setEmail] = useState([''])
    const [mobileNumber, setMobileNumber] = useState([0])
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    
    const saveOperator = e => {
        e.preventDefault();
        const operator = {
            operatorName,
            email,
            mobileNumber
        };
        OperatorService.addOperator(operator,token)
            .then(response => {
                console.log("Response received from add operator API:", response.data);
                alert("Operator added successfully!");
                setOperatorName('')
                setEmail('')
                setMobileNumber('')
            })
            .catch(error => {
                console.error("Error received from add operator API:", error);
                window.alert("error adding operator")
            });
    };
    const handleCancel = () => {
        navigate("/adminui")
    };
    
    return (
        <div className='container' style={{ backgroundColor: '#f0f8ff', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <div className='card' style={{ backgroundColor: '#add8e6', marginLeft: "300px", marginTop: '40px', marginRight: '300px', borderRadius: '10px', padding: '20px', alignItems: 'center',boxShadow: '0 30px 50px rgba(0, 0, 0, 0.1)'}}>
                <h2 className="text-center">Add Operator</h2>
                <div className="card-body margin-top=2px">
                    <form onSubmit={saveOperator} className="two-column-form">
                        <div className="column">
                            <div className="form-group">
                                <label htmlFor="operatorName"className="label-width">Operator Name</label>
                                <input type="text" className="form-control" id="operatorName" value={operatorName} onChange={e => setOperatorName(e.target.value)} placeholder="Enter the Operator Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"className="label-width">Email</label>
                                <input type="text" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter the Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobileNumber"className="label-width">Mobile Number</label>
                                <input type="text" className="form-control" id="mobileNumber" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} placeholder="Enter the Mobile nUmber" />
                            </div>
                            <br/>
                            <div className="form-group row">
                            <div className="col-sm-6">
                                <button type="submit" className="btn btn-primary btn-block">Save Operator</button>
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

export default OperatorComponent;