import React, { useState } from 'react';
import { Card, CardBody, Form, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCreditCard, faCalendarAlt, faLock, faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faCcMastercard, faCcVisa, faCcAmazonPay, faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import '../styles/PaymentForm.css';
import { useSelector } from 'react-redux';
import BookingService from '../services/BookingService'

function PaymentForm() {
  const navigate = useNavigate();
  const names = useSelector((state) => state.seatSelection.names);
  const user = useSelector((state) => state.auth.user);
  const { source, destination, date } = useSelector(state => state.search);
  const selectedBus = useSelector((state) => state.bus.selectedBus);
  const selectedSeats = useSelector((state) => state.bus.selectedSeats);
  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  const [errors, setErrors] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear previous error message when user starts typing
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateCardHolder = () => {
    if (!formData.cardHolder.trim()) {
      return '';
    }
    return formData.cardHolder.length >= 4 ? 'valid' : 'invalid';
  };

  const validateCardNumber = () => {
    if (!formData.cardNumber.trim()) {
      return '';
    }
    return formData.cardNumber.match(/^\d{4}\s?\d{4}\s?\d{4}/) ? 'valid' : 'invalid';
  };

  const validateExpiryDate = () => {
    if (!formData.expiryDate.trim()) {
      return '';
    }
    const currentDate = new Date();
    const [month, year] = formData.expiryDate.split('/');
    const fullYear = parseInt(year) < 100 ? parseInt(year) + 2000 : parseInt(year);
    const expiryDate = new Date(`${fullYear}-${month}-01`);
    return expiryDate > currentDate ? 'valid' : 'invalid';
  };

  const validateCVC = () => {
    if (!formData.cvc.trim()) {
      return '';
    }
    return formData.cvc.match(/^\d{3}$/) ? 'valid' : 'invalid';
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date().toISOString().split('T')[0]
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    return { currentDate, currentTime };
  };

  const handlePaySubmit = (e) => {
    console.log("handlePaySubmit triggered....")
    e.preventDefault();
    const errors = {};
    if (!formData.cardHolder.trim()) {
      errors.cardHolder = 'Card holder is required';
    }
    if (!formData.cardNumber.trim()) {
      errors.cardNumber = 'Card number is required';
    }
    if (!formData.expiryDate.trim()) {
      errors.expiryDate = 'Expiry date is required';
    }
    if (!formData.cvc.trim()) {
      errors.cvc = 'CVC is required';
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted successfully!');
    } else {
      console.log('Form has errors!');
      alert("Enter the correct payment details!!")
      navigate("/payment")
      return '';
    }
    const { currentDate, currentTime } = getCurrentDateTime();
    const noOfSeatsBooked = selectedSeats.length;
    const fare = noOfSeatsBooked * (selectedBus.farePerSeat);
    const booking = {
      bookingStatus: "confirmed", bookingDate: currentDate, bookingTime: currentTime, source, destination,
      journeyDate: date, noOfSeatsBooked, fare, userDTO: null, busDTO: null
    };
    const userid = user.userid;
    const busid = selectedBus.busid;
    console.log("Booking created before posting...", booking, "user id", userid, "bus id", busid)
    BookingService.addBookingwithids(booking, userid, busid,token)
      .then(response => {
        console.log("response received from booking save api....", response.data);
        navigate('/success')
      })
      .catch(error => {
        console.error("Error saving booking:", error);
      });
  }

  return (
    <Container className="wrapper">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="payment">
            <div className="payment-logo">
              <p>Pay</p>
            </div>
            <h2>Payment Gateway</h2>
            <div >
              <FontAwesomeIcon icon={faCcMastercard} size="2xl" style={{ color: "#2196F3" }} />
              &nbsp; &nbsp;
              <FontAwesomeIcon icon={faCcVisa} size="2xl" style={{ color: "#2196F3" }} />
              &nbsp; &nbsp;
              <FontAwesomeIcon icon={faCcAmazonPay} size="2xl" style={{ color: "#2196F3" }} />
              &nbsp; &nbsp;
              <FontAwesomeIcon icon={faCcPaypal} size="2xl" style={{ color: "#2196F3" }} />
            </div>
            <br />
            <Form className="form" onSubmit={handlePaySubmit}>
              <Form.Group as={Row} className="mb-3" controlId="cardHolder">
                <Form.Label column sm={3}>
                  Card holder:
                  <FontAwesomeIcon icon={faCheck} className={validateCardHolder() === 'valid' ? 'valid-icon' : 'hide'} />
                  <FontAwesomeIcon icon={faTimes} className={validateCardHolder() === 'invalid' ? 'invalid-icon' : 'hide'} />
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    isInvalid={!!errors.cardHolder}
                    placeholder="Enter card holder name (at least 4 letters)"
                  />
                  {errors.cardHolder && <Form.Control.Feedback type="invalid">{errors.cardHolder}</Form.Control.Feedback>}
                  {validateCardHolder() === 'valid' ? null : (
                    <p className="instruction-text">
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Card holder name should be at least 4 letters.
                    </p>
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="cardNumber">
                <Form.Label column sm={3}>
                  Card number:
                  <FontAwesomeIcon icon={faCheck} className={validateCardNumber() === 'valid' ? 'valid-icon' : 'hide'} />
                  <FontAwesomeIcon icon={faTimes} className={validateCardNumber() === 'invalid' ? 'invalid-icon' : 'hide'} />
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.cardNumber}
                    placeholder="Enter card number"
                  />
                  {errors.cardNumber && <Form.Control.Feedback type="invalid">{errors.cardNumber}</Form.Control.Feedback>}
                  {validateCardNumber() === 'valid' ? null : (
                    <p className="instruction-text">
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Please enter your card number.
                    </p>
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="expiryDate">
                <Form.Label column sm={3}>
                  Expiry date:
                  <FontAwesomeIcon icon={faCheck} className={validateExpiryDate() === 'valid' ? 'valid-icon' : 'hide'} />
                  <FontAwesomeIcon icon={faTimes} className={validateExpiryDate() === 'invalid' ? 'invalid-icon' : 'hide'} />
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    isInvalid={!!errors.expiryDate}
                    placeholder="MM/YY"
                  />
                  {errors.expiryDate && <Form.Control.Feedback type="invalid">{errors.expiryDate}</Form.Control.Feedback>}
                  {validateExpiryDate() === 'valid' ? null : (
                    <p className="instruction-text">
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Please enter the expiry date in MM/YY format.
                    </p>
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="cvc">
                <Form.Label column sm={3}>
                  CVC:
                  <FontAwesomeIcon icon={faCheck} className={validateCVC() === 'valid' ? 'valid-icon' : 'hide'} />
                  <FontAwesomeIcon icon={faTimes} className={validateCVC() === 'invalid' ? 'invalid-icon' : 'hide'} />
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    isInvalid={!!errors.cvc}
                    placeholder="Enter CVC"
                  />
                  {errors.cvc && <Form.Control.Feedback type="invalid">{errors.cvc}</Form.Control.Feedback>}
                  {validateCVC() === 'valid' ? null : (
                    <p className="instruction-text">
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Please enter the 3-digit CVC number.
                    </p>
                  )}
                </Col>
              </Form.Group>

              <div className="text-center">
                <button type="submit" className="btn2">Pay</button>
              </div>
            </Form>
          </div>
        </Col>
        <Col md={6}>
          <img src='https://img.freepik.com/free-vector/credit-card-with-dollar-coin-users-e-commerce-online-shopping-financial-operations-plastic-card-mobile-payment-banking-concept-vector-isolated-illustration_335657-2224.jpg'></img>
          <Card className="bookingCard">
            <CardBody>
              <Container md={6}>
                <h4>Booking Details</h4>
                <hr className="divider" />
                <p>No. of people: {names.length}</p>
                {names.map((name, index) => (
                  <p key={index}>{name}, seat {selectedSeats[index]}</p>
                ))}
                <p>Cost of each seat: Rs {selectedBus.farePerSeat}</p>
                <hr className="divider" />
                <h6>Total cost: <strong>Rs. {selectedSeats.length * (selectedBus.farePerSeat)}</strong></h6>
              </Container>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentForm;