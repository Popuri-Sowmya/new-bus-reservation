import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import pagenotfound from '../utils/pagenotfound.jpeg';

const NotFoundPage = () => {
  return (
    <div>
      <Image src={pagenotfound} alt="My Image" style={{ width: '60', height: '60vh' }} />
      <p><span className='line'>
        <Link to="/">click here to go back to home</Link>
      </span></p>
    </div>
  );
}

export default NotFoundPage;