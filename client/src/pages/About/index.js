import React from "react";
import { Header } from "semantic-ui-react";

import "./style.css";

const About = () => {
    return (
        <>
            <div id="about-container">
                <div id="about">
                    <div className="about-section">
                        <Header className="about-header" as="h1">About Planner Findr</Header>
                        <p className="about-text">
                            Planner Findr is your go-to platform for discovering and booking trusted service providers for all types of events —
                            from intimate birthday celebrations to large-scale weddings and corporate gatherings.
                        </p>
                    </div>
                    <div className="about-section">
                        <Header className="about-header" as="h1">Our Mission</Header>
                        <p className="about-text">
                            We aim to simplify the event planning process by connecting customers with reliable, highly-rated vendors
                            including caterers, decorators, photographers, venues, stylists, entertainers, and more — all in one place.
                        </p>
                    </div>
                    <div className="about-section">
                        <Header className="about-header" as="h1">How It Works</Header>
                        <ol id="about-how-it-works-list">
                            <li className="about-how-it-works-list-item">Browse service categories or use the search bar to find what you need.</li>
                            <li className="about-how-it-works-list-item">View provider profiles, reviews, and photos of past events.</li>
                            <li className="about-how-it-works-list-item">Submit a reservation or request a quote directly through our platform.</li>
                        </ol>
                    </div>
                    <div className="about-section">
                        <Header className="about-header" as="h1">Why Choose Planner Findr?</Header>
                        <ul id="about-why-choose-list">
                            <li className="about-why-choose-list-item">Verified service providers</li>
                            <li className="about-why-choose-list-item">Transparent pricing and availability</li>
                            <li className="about-why-choose-list-item">Real customer reviews and event galleries</li>
                            <li className="about-why-choose-list-item">Seamless booking and communication</li>
                        </ul>
                    </div>
                    <div className="about-section">
                        <Header className="about-header" as="h1">Meet the Team</Header>
                        <p className="about-text">
                            Planner Findr was founded by a passionate group of event professionals and tech builders who believe
                            that creating memorable moments should be exciting — not overwhelming.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;