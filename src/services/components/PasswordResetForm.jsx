import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';

const PasswordResetForm = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [validNewPassword, setValidNewPassword] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        const newPasswordValue = event.target.value;
        setNewPassword(newPasswordValue);
        setValidNewPassword(newPasswordValue.length >= 8);
    };

    const handleConfirmPasswordChange = (event) => {
        const confirmPasswordValue = event.target.value;
        setConfirmPassword(confirmPasswordValue);
        setValidConfirmPassword(confirmPasswordValue === newPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        UserService.getbyUsername(username)
            .then((response) => {
                setUser(response.data);
                setError(null);
                setSubmitted(true);
            })
            .catch((error) => {
                setUser(null);
                setError('User not found');
            });
    };

    const handleResetPassword = () => {
        const userid = user.userid
        const userName = user.userName
        const gender = user.gender
        const password = newPassword
        const mobileNumber = user.mobileNumber
        const email = user.email
        const roles = user.roles
        const updatedUser = { userName, gender, password, mobileNumber, email, roles };
        console.log("user object before updating password", updatedUser)
        UserService.updateUser(userid, updatedUser)
            .then((response) => {
                console.log("Response received from route update API...", response.data);
                window.alert("Password updated successfully!");
            })
            .catch(error => {
                console.log("error received from route update api...", error);
                window.alert("An error occurred while updating the password!");
            });
        navigate("/login")
    };

    return (
        <div className='card' style={{marginLeft:'500px', marginRight:'500px'}}>
            <div className='card-body'>
                <div style={{ backgroundColor: '#f0f5ff', padding: '20px', borderRadius: '10px' }}>
                    {!submitted && (
                        <Form onSubmit={handleSubmit}>
                            <h2 style={{ color: '#007bff' }}>Password Reset</h2>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Enter username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon2"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                                &nbsp; &nbsp;
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </InputGroup>
                        </Form>
                    )}
                    {error && <p style={{ color: '#dc3545' }}>User not found</p>}
                    {user && submitted && ( 
                        <Form>
                            <Form.Group controlId="newPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                    isInvalid={newPassword.length > 0 && !validNewPassword}
                                    isValid={validNewPassword}
                                />
                                <Form.Control.Feedback type="invalid">Password must be at least 8 characters</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    isInvalid={confirmPassword.length > 0 && !validConfirmPassword}
                                    isValid={validConfirmPassword}
                                />
                                <Form.Control.Feedback type="invalid">Passwords do not match</Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" onClick={handleResetPassword} disabled={!validNewPassword || !validConfirmPassword}>
                                Reset Password
                            </Button>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PasswordResetForm;
