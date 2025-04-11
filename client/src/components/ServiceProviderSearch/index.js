import React from "react";
import { Header, Button } from "semantic-ui-react";

import "./style.css";

const ServiceSearchProvider = () => {
    return (
        <>
            <div id="service-provider-search-container">
                <div id="service-search-provider">
                    <Header id="service-provider-search-header" as="h1">Service Search Provider</Header>
                    <Header as="h4">Select from a wide range of service providers for your event needs</Header>
                    <input />
                    <Button id="service-provider-search-reset-filter-btn" content="Reset Filters" />
                    <Button id="service-provider-search-filter-btn" content="Filter" />
                </div>
            </div>

        </>
    );
};

export default ServiceSearchProvider;