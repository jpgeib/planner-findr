import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";
import Profile from "../../pages/Profile";
import Providers from "../../pages/Providers";
import SingleProvider from "../../pages/SingleProvider";
import Reviews from "../../pages/Reviews";
import SingleReview from "../../pages/SingleReview";
import Write from "../../pages/Write";
import Edit from "../../pages/Edit";
import Contact from "../../pages/Contact";
import SingleEvent from "../../pages/SingleEvent";
import Events from "../../pages/Events";
import Reservations from "../../pages/Reservations";
import SingleReservation from "../../pages/SingleReservation";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route exact path="/reset/:id/:token" element={<ResetPassword />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/events" element={<Events />} />
        <Route exact path="/event/:id" element={<SingleEvent />} />
        <Route exact path="/reservations" element={<Reservations />} />
        <Route exact path="/reservation/:id" element={<SingleReservation />} />
        <Route exact path="/providers" element={<Providers />} />
        <Route exact path="/provider/:id" element={<SingleProvider />} />
        <Route exact path="/reviews" element={<Reviews />} />
        <Route exact path="/review/:id" element={<SingleReview />} />
        <Route exact path="/write" element={<Write />} />
        <Route exact path="/edit/:id" element={<Edit />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;