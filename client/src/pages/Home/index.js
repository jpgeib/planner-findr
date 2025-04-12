import React, { useEffect } from "react";
import ServiceSearchProvider from "../../components/ServiceProviderSearch";
import AvailableServices from "../../components/AvailableServices";
import ContactForm from "../../components/ContactForm";

import { axiosInstance } from "../../utils/api";

const Home = () => {

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
            <ContactForm />
        </>
    );
};

export default Home;