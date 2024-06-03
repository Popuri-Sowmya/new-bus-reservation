import React, { useState, useEffect } from 'react';
import OperatorService from '../services/OperatorService';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdateOperator = () => {
    const [operatorName, setOperatorName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();
    const token = useSelector((state) => state.auth.token);

    const handleCancel = () => {
        window.history.back(); // Go back to the previous page
    };

    useEffect(() => {
        console.log("use effect triggered..");
        console.log("id value received from URL using useParams", id);
        if (id) {
            OperatorService.getOperatorById(id,token)
                .then((response) => {
                    console.log("data received from getbyid api", JSON.stringify(response.data));
                    setOperatorName(response.data.operatorName);
                    setEmail(response.data.email);
                    setMobileNumber(response.data.mobileNumber);
                    console.log("state variables changed");
                })
                .catch(error => { console.log("error received from API...", error); });
        }
    }, [id]);

    const saveOperator = (e) => {
        e.preventDefault();
        // Your logic for saving the route goes here
        console.log("Operator saved!");
        const operator = {
            operatorName,
            email,
            mobileNumber
        };
        console.log("operator received for update", operator);
    
        OperatorService.updateOperator(id, operator, token)
            .then(response => {
                console.log("Response received from update operator API:", response.data);
                alert("Operator updated successfully!");
                navigate("/adminui")
            })
            .catch(error => {
                console.error("Error received from update operator API:", error);
                alert("Error updating operator!")
            });
    };
    

    return (
        <div>
            <div className='container' style={{ backgroundColor: '#f0f8ff', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                {console.log("Application rendered..")}
                <br/>
                <div className='card' style={{ backgroundColor: '#add8e6', marginLeft: "400px", marginTop: '40px', marginRight: '400px', borderRadius: '10px', padding: '20px', boxShadow: '0 30px 50px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-center'>Update Operator</h2>
                        <div className='card-body'>
                            <form >
                                <div className="form-group mb-2">
                                    <label className='form-label' htmlFor="operatorName">Operator Name</label>
                                    <input type="text" placeholder="Enter the Operator Name"
                                        className="form-control" id="operatorName" name="operatorName" value={operatorName}
                                        onChange={(e) => { setOperatorName(e.target.value) }} />
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label' htmlFor="email">Email</label>
                                    <input type="text" placeholder="Enter the Email"
                                        className="form-control" id="email" name="email" value={email}
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label' htmlFor="mobileNumber">Mobile Number</label>
                                    <input type="text" placeholder=""
                                        className="form-control" id="mobileNumber" name="mobileNumber" value={mobileNumber}
                                        onChange={(e) => { setMobileNumber(e.target.value) }} />
                                </div>
                                <div className="form-group row">
                            <div className="col-sm-6">
                                <button onClick={(e) => saveOperator(e)}type="submit" className="btn btn-primary btn-block">Save Operator</button>
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

export default UpdateOperator;