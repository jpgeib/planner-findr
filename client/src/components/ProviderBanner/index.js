import React from "react";
import { Header, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./style.css";

const ProviderBanner = () => {
    return (
        <>
            <div id="provider-banner-container">
                <div id="provider-banner">
                    <div className="provider-banner-col">
                        <Image id="provider-banner-profile-image" src="https://zuse-inc-bucket.s3.amazonaws.com/featured-provider.png" draggable="false" />
                    </div>
                    <div className="provider-banner-col">

                    </div>
                    <div className="provider-banner-col">

                    </div>
                </div>
            </div>
            <h1>Provider Banner</h1>
        </>
    );
};

export default ProviderBanner;