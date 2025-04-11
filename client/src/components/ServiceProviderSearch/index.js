import React from "react";
import { Header, Button } from "semantic-ui-react";

import "./style.css";

const ServiceSearchProvider = () => {
    return (
        <>
            <div id="service-provider-search-container">
                <div id="service-provider-search">
                    <div className="service-provider-search-col">
                        <Header id="service-provider-search-header" as="h1">Service Provider Search</Header>
                    </div>
                    <div className="service-provider-search-col">
                        <Header id="service-provider-search-subheader" as="h4">Select from a wide range of service providers for your event needs</Header>
                    </div>
                    <div className="service-provider-search-col">
                        <input id="service-provider-search-input" placeholder="Search for services..." />
                    </div>
                    <div className="service-provider-search-col">
                        <Button id="service-provider-search-reset-filter-btn" content="Reset Filters" />
                    </div>
                    <div className="service-provider-search-col">
                        <Button id="service-provider-search-filter-btn" content="Filter" />
                    </div>
                </div>
            </div>

        </>
    );
};

export default ServiceSearchProvider;