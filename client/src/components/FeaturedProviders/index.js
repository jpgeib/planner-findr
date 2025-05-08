import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Image, Rating, Header } from "semantic-ui-react";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const FeaturedProviders = (props) => {

    const { screenWidth } = props;

    const [providers, setproviders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/providers`);
                setproviders(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, []);

    return (
        <div id="featured-providers-container">
            <Header as="h1" id="featured-providers-header">Featured Providers</Header>
            {providers.length > 0 ? null : <div id="featured-providers-no-result-container">
                <Image id="featured-providers-no-result-image" src="https://zuse-inc-bucket.s3.us-east-1.amazonaws.com/no-results-white.png" draggable="false" />
            </div>}
            <div id="featured-providers">
                {providers.map((provider, index) => {
                    const providerIndex = screenWidth > 1199 || screenWidth < 992 ? 4 : 3;
                    return (
                        (index >= providerIndex ? null : <div key={index} className="featured-provider-card-col">
                            <Link to={`/provider/${provider.id}`}>
                                <div className="featured-provider-card">
                                    <Image className="featured-provider-card-image" src={provider.service_image} draggable="false" />
                                    <div className="featured-provider-card-service">{provider.service}</div>
                                    <div className="featured-provider-card-rate">${provider.pay_rate}/hr</div>
                                    <div className="featured-provider-card-distance">{provider.distance <= 1 ? `${provider.distance} mile away` : `${provider.distance} miles away`}</div>
                                </div>
                            </Link>
                        </div>
                    ));
                })}
            </div>
            <Button as={Link} to="/providers" size="massive" id="featured-providers-btn">More Providers</Button>
        </div>
    );
};

export default FeaturedProviders;