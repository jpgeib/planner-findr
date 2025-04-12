import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Image, Rating } from "semantic-ui-react";
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
            <p className="featured-providers-text">{providers.length > 0 ? "Don't take our word for it, listen to our satisfied customers!" : "Looks like we don't have any providers yet, you could be the first!"}</p>
            {providers.length > 0 ? null : <div id="featured-providers-no-result-container">
                <Image id="featured-providers-no-result-image" src="https://zuse-inc-bucket.s3.us-east-1.amazonaws.com/no-results-white.png" draggable="false" />
            </div>}
            <div id="featured-providers">
                {providers.map((provider, index) => {
                    const providerIndex = screenWidth > 1199 ? 5 : 6;
                    return (
                        (provider.rating < 3 || index >= providerIndex) ? null : <div key={provider.id} className="featured-provider-card-col">
                            <Link to={`/provider/${provider.id}`}>
                                <div className="featured-provider-card">
                                    <Image className="featured-provider-card-image" src={provider.image} draggable="false" />
                                    <Rating className="featured-provider-card-rating" maxRating={5} rating={provider.rating} size="huge" disabled />
                                    <div className="featured-provider-card-text">{provider.text}</div>
                                    <div className="featured-provider-card-author">{provider.first_name} {provider.last_name}</div>
                                    <div className="featured-provider-card-date">{moment(provider.date).format("MMMM Do YYYY")}</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
            <Button as={Link} to="/providers" size="massive" id="featured-providers-btn">See More providers</Button>
        </div>
    );
};

export default FeaturedProviders;