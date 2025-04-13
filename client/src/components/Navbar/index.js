import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LogoutModal from "../LogoutModal";

import "./style.css";

const Navbar = (props) => {

    const { currentUser, logout } = props.auth;

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
                {/* <Menu.Item
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
                </Menu.Item> */}
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
                {currentUser === null ? <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    to="/login"
                    name="login"
                >
                    Log In
                </Menu.Item> :
                <Menu.Item
                    className="header-nav-item"
                    name="profile"
                >
                    <Image src={currentUser.profile_image} size="mini" circular />
                    <Dropdown>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} target=":blank" to={`/profile/${currentUser.id}`}>Profile</Dropdown.Item>
                            <Dropdown.Item>
                                <LogoutModal logout={logout} />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>}
            </Menu>
        </>
    );
};

export default Navbar;