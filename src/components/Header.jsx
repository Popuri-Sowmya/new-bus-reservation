import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import fastXImage from '../utils/fastx.jpg';
import { useDispatch } from 'react-redux';
import { logout } from './actions/authActions';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("user recieved from redux in header",user)
  
  useEffect(() => {
    // setInitialized(true);
    handleLogout()
  }, []);

  const handleAdmin = () => {
    navigate('/admin')
  }

  const handleOperator = () => {
    navigate('/operator')
  }

  const handleUser = () => {
    navigate('/login')
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  const handleProfile = () => {
    navigate('/profile')
  }

  const handleSignup = () => {
    navigate('/register')
  }

  const handleHelp = () => {
    navigate('/help')
  }

  return (
    <>
      <Navbar style={{ backgroundColor: '#cef1f5' }} variant="light" expand="lg">
        <Container className="justify-content-between">
          <Navbar.Brand href="/">
            <img
              src={fastXImage}
              width="70"
              height="70"
              className="d-inline-block align-top"
              alt="FastX Logo"
            />
          </Navbar.Brand>
          
          <Nav>
            <Nav.Link className="headernav" onClick={handleHelp}>Help</Nav.Link>
            {user === null ? (
              <NavDropdown className="headernav" title="Login" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleUser}>Login</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSignup}>Signup</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown className="headernav" title={user ? user.userName : ""} id="basic-nav-dropdown">
                {user.roles !== 'ROLE_OPERATOR' && user.roles !== 'ROLE_ADMIN' && (
                  <NavDropdown.Item onClick={handleProfile}>Profile</NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
