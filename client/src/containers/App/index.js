import React from "react";
import { Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
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
import Footer from "../../components/Footer";

const getWindowDimensions = () => {
  const page = document.querySelector("html");
  const { clientWidth: width, clientHeight: height } = page;
  return {
    width,
    height
  }
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const App = () => {

  const { width } = useWindowDimensions();
  const auth = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home auth={auth} />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/register" element={<Register auth={auth} />} />
        <Route exact path="/login" element={<Login auth={auth} />} />
        <Route exact path="/forgot" element={<ForgotPassword auth={auth} />} />
        <Route exact path="/reset/:id/:token" element={<ResetPassword auth={auth} />} />
        <Route exact path="/profile" element={<Profile auth={auth} />} />
        <Route exact path="/events" element={<Events auth={auth} />} />
        <Route exact path="/event/:id" element={<SingleEvent auth={auth} />} />
        <Route exact path="/reservations" element={<Reservations auth={auth} />} />
        <Route exact path="/reservation/:id" element={<SingleReservation auth={auth} />} />
        <Route exact path="/providers" element={<Providers auth={auth} />} />
        <Route exact path="/provider/:id" element={<SingleProvider auth={auth} />} />
        <Route exact path="/reviews" element={<Reviews auth={auth} />} />
        <Route exact path="/review/:id" element={<SingleReview auth={auth} />} />
        <Route exact path="/write" element={<Write auth={auth} />} />
        <Route exact path="/edit/:id" element={<Edit auth={auth} />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;