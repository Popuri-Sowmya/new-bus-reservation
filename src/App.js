import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Footer } from './components/Footer';
import DisplayComponent from './components/DisplayComponent';
import NotFoundPage from './components/NotFoundPage';
import { RegistrationForm } from './components/RegistrationForm';
import { Help } from './components/Help';
import PaymentForm from './components/PaymentForm';
import { Routes, Route } from 'react-router-dom';
import SuccessForm from './components/SuccessForm.jsx';
import ProfileComponent from './components/ProfileComponent.jsx';
import { BusComponent } from './components/BusComponent';
import RouteComponent from './components/RouteComponent';
import OperatorInterface from './components/OperatorInterface';
import UpdateBus from './components/UpdateBus';
import UpdateRoute from './components/UpdateRoute';
import UpdateOperator from './components/UpdateOperator';
import Header from './components/Header.jsx';
import AdminInterface from './components/AdminInterface.jsx';
import UserLoginForm from './components/UserLoginForm.jsx';
import PasswordResetForm from './components/PasswordResetForm.jsx';
import SearchBar from './components/SearchBar.jsx';

function App() {
  return (
    <><Header />
    <Routes>
      <Route path='/' element={<SearchBar />} />
      <Route path='/display' element={<DisplayComponent />} />
      <Route path='/buses' element={<BusComponent />} />
      <Route path='/register' element={<RegistrationForm />} />
      <Route path='/help' element={<Help />} />
      <Route path='/payment' element={<PaymentForm />} />
      <Route path='/success' element={<SuccessForm />} />
      <Route path='/profile' element={<ProfileComponent />} />
      <Route path='/login' element={<UserLoginForm />} />
      <Route path='/*' element={<NotFoundPage />} />
      <Route path='/display' element={<DisplayComponent />} />
      <Route path='/operatorui' element={<OperatorInterface />} />
      <Route path='/adminui' element={<AdminInterface />} />
      <Route path='/route' element={<RouteComponent />} />
      <Route path='/forget' element={<PasswordResetForm />} />
      <Route path='/updatebus/:id' element={<UpdateBus />} />
      <Route path='/update/:id' element={<UpdateOperator />} />
      <Route path='/updateroute/:id' element={<UpdateRoute />} />
    </Routes>
    <Footer /></>
  );
}

export default App;