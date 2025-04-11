import React from "react";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./style.css";

const Navbar = () => {
    return (
        <>
            <Menu id="main-menu" fluid secondary>
                <Menu.Item
                    className="header-nav-item"
                    position="left"
                    as={Link}
                    to="/"
                    name="home"
                >
                    <div id="planner-findr-logo-container">
                        <Image
                            draggable="false"
                            size="medium"
                            id="home-btn-img"
                            src="https://plannerfindr.s3.us-east-1.amazonaws.com/planner-findr-logo.png"
                        />
                    </div>
                </Menu.Item>
                <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    to="/about"
                    name="about"
                >
                    About
                </Menu.Item>
                <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    to="/profile"
                    name="profile"
                >
                    Profile
                </Menu.Item>
                <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    to="/events"
                    name="events"
                >
                    Events
                </Menu.Item>
                <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    to="/reservations"
                    name="reservations"
                >
                    Reservations
                </Menu.Item>
                <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    to="/providers"
                    name="providers"
                >
                    Service Providers
                </Menu.Item>
                <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    to="/reviews"
                    name="reviews"
                >
                    Reviews
                </Menu.Item>
                <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    to="/contact"
                    name="contact"
                >
                    Contact
                </Menu.Item>
            </Menu>
        </>
    );
};

export default Navbar;