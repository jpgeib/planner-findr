import React, { useEffect } from "react";
import ServiceSearchProvider from "../../components/ServiceProviderSearch";
import AvailableServices from "../../components/AvailableServices";
import ContactForm from "../../components/ContactForm";
import FeaturedProviders from "../../components/FeaturedProviders";
import { axiosInstance } from "../../utils/api";


const Home = (props) => {

    const { screenWidth } = props;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get("/test");
                console.log(res.data);
            } catch (error) {
                console.error(error);
            };
        };
        fetchData();
    });

    return (
        <>
            <ServiceSearchProvider />
            <AvailableServices />
            <FeaturedProviders screenWidth={screenWidth} />
            <ContactForm />
        </>
    );
};

export default Home;