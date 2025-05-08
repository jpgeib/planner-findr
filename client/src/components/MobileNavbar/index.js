import React, { useState } from "react";
import { Sidebar, Menu, Dropdown, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LogoutModal from "../LogoutModal";

import "./style.css";

const MobileNavbar = (props) => {

    const { screenWidth } = props;
    const { currentUser, logout } = props.auth;
    const [mainVisible, setMainVisible] = useState(false);

    let logoSize;

    if (screenWidth >= 768) {
        logoSize = "medium";
    } else {
        logoSize = "small";
    }

    return (
        <Menu id="mobile-main-menu" fluid secondary>
            <Menu.Item
                className="header-nav-item"
                position="left"
                as={Link}
                to="/"
                name="home"
            >
                <div id="planner-findr-logo-container">
                    <Image 
                        size={logoSize} 
                        draggable="false" 
                        id="home-btn-img" 
                        src="https://plannerfindr.s3.us-east-1.amazonaws.com/planner-findr-logo.png" 
                    />
                </div>
            </Menu.Item>
            <Menu.Item>
                <Icon id="header-nav-stack" name="bars"
                    onClick={(e) => setMainVisible(!mainVisible)}
                />
            </Menu.Item>
            <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                onHide={() => setMainVisible(false)}
                vertical
                visible={mainVisible}
                width="wide"
            >
                <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    onClick={(e) => setMainVisible(false)}
                    to="/about"
                    name="about"
                >
                    About
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    onClick={(e) => setMainVisible(false)}
                    to="/providers"
                    className="header-nav-item"
                    name="providers"
                >
                    Service Providers
                </Menu.Item>
                <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    onClick={(e) => setMainVisible(false)}
                    to="/reviews"
                    name="reviews"
                >
                    Reviews
                </Menu.Item>
                <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    onClick={(e) => setMainVisible(false)}
                    to="/contact"
                    name="contact"
                >
                    Contact
                </Menu.Item>
                {currentUser === null ? <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    onClick={(e) => setMainVisible(false)}
                    to="/login"
                    name="login"
                >
                    Log In
                </Menu.Item> :
                <Menu.Item
                    className="header-nav-item"
                    as={Link}
                    onClick={(e) => setMainVisible(false)}
                    to={`/profile/${currentUser.id}`}
                    name="profile"
                >
                   Profile
                </Menu.Item>}
                {currentUser === null ? null :
                    <Menu.Item
                        className="header-nav-item"
                        as={Link}
                        onClick={(e) => setMainVisible(false)}
                        to="/reviews/write"
                        name="write-review"
                    >
                        <LogoutModal logout={logout} />
                    </Menu.Item>
                }
            </Sidebar>


        </Menu>
    );
};

export default MobileNavbar;