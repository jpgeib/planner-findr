import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";
import Providers from "../../pages/Providers";
import SingleProvider from "../../pages/SingleProvider";
import Reviews from "../../pages/Reviews";
import SingleReview from "../../pages/SingleReview";
import Write from "../../pages/Write";
import Edit from "../../pages/Edit";
import Contact from "../../pages/Contact";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route exact path="/reset/:id/:token" element={<ResetPassword />} />
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