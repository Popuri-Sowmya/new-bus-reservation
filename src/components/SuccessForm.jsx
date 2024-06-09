import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TicketPdf, generatePdf } from './TicketPdf';
import { PDFDownloadLink } from '@react-pdf/renderer';

const SuccessForm = () => {
  const { source, destination, date } = useSelector(state => state.search);
  const selectedBus = useSelector((state) => state.bus.selectedBus);
  const selectedSeats = useSelector((state) => state.bus.selectedSeats);
  const names = useSelector((state) => state.seatSelection.names);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handlePage = () => {
    navigate("/");
  };

  useEffect(() => {
    const sendEmail = async () => {
      const pdfBlob = await generatePdf({ source, destination, date, selectedBus, selectedSeats, names });
      const formData = new FormData();
      const recipientEmail = user.email;
      console.log(recipientEmail)
      console.log(pdfBlob)
      formData.append('pdf', pdfBlob, 'ticket.pdf');
      formData.append('recipientEmail', recipientEmail);
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }
      axios.post('http://localhost:8095/api/send-email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Email sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
    };

    sendEmail();
  }, [source, destination, date, selectedBus, selectedSeats, names]);

  console.log("Rendering SuccessForm");
  console.log("Source:", source);
  console.log("Destination:", destination);
  console.log("Date:", date);
  console.log("Selected Bus:", selectedBus);
  console.log("Selected Seats:", selectedSeats);
  console.log("Names:", names);

  return (
    <Container style={{ padding: '50px', textAlign: 'center', backgroundColor: "white" }}>
      <Row className="justify-content-center text-center">
        <Col>
          <FontAwesomeIcon icon={faCircleCheck} beat size="2xl" style={{ color: "#3bb54f" }} className="check-icon" />
          <br />
          <h1 style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>Booking successful!! Happy Journey!!</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <div className='detailsdiv'>
            <h5 className='boardtic'>Boarding Ticket</h5>
            <Table className='detailstable' striped bordered>
              <tbody>
                {names.map((name, index) => (
                  <tr className='table-info' key={index}>
                    <td>Passenger Name: {name}</td>
                    <td>Seat: {selectedSeats[index]}</td>
                  </tr>
                ))}
                <tr className='table-info'>
                  <td>Source: {source}</td>
                  <td>Destination: {destination}</td>
                </tr>
                <tr className='table-info'>
                  <td>Departure Time: {selectedBus.departureTime}</td>
                  <td>Arrival Time: {selectedBus.arrivalTime}</td>
                </tr>
                <tr className='table-info'>
                  <td>Journey Date: {date}</td>
                  <td>Total Cost: {selectedBus.farePerSeat * names.length}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Button type='primary' onClick={handlePage} style={{ backgroundColor: '#03A9F4', borderColor: '#03A9F4' }}>Go back to main page</Button>
        </Col>
      </Row>
      {console.log("rendering perfectly til pdfdownloadlink")}
      <TicketPdf
        source={source}
        destination={destination}
        date={date}
        selectedBus={selectedBus}
        selectedSeats={selectedSeats}
        names={names}/>
    </Container>
  );
};

export default SuccessForm;
