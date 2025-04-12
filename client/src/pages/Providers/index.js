import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Header, Image, Icon, Rating } from "semantic-ui-react";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const Providers = (props) => {

    const { whichWebsite } = props;

    const [providers, setProviders] = useState([]);

    const site = whichWebsite(window.location.href, "zuse", "acp", "union");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get("/providers");
                setProviders(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, []);

    return (
        <div id="providers-container">
            <div id="providers-headers-container">
                <div className="providers-headers-col">
                    <Header as="h1" id="providers-header">providers</Header>
                </div>
                <div className="providers-headers-col">
                    <Button as={Link} to="/write" size="massive" icon labelPosition="right" id="write-provider-btn">Write A provider<Icon id="write-icon" name="edit" /></Button>
                </div>
            </div>
            <p className="providers-text">{providers.length > 0 ? "Don't take our word for it, listen to our satisfied customers!" : "Looks like we don't have any providers yet, you could be the first!"}</p>
            {providers.length > 0 ? null : <div id="providers-no-result-container">
                <Image id="providers-no-result-image" src="https://zuse-inc-bucket.s3.amazonaws.com/no-results-blue.png" draggable="false" />
            </div>}
            <div id="providers">
                {providers.map((provider, index) => {
                    return (
                        provider.rating < 3 ? null : <div key={provider.id} className="provider-card-col">
                            <Link to={`/provider/${provider.id}`}>
                                <div className="provider-card">
                                    <Image className="provider-card-image" src={provider.image} draggable="false" />
                                    <Rating className="provider-card-rating" maxRating={5} rating={provider.rating} icon="star" size="huge" disabled />
                                    <div className="provider-card-text">{provider.text}</div>
                                    <div className="provider-card-author">{provider.first_name} {provider.last_name}</div>
                                    <div className="provider-card-date">{moment(provider.date).format("MMMM Do YYYY")}</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Providers;