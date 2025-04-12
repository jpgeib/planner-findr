import React, { useEffect } from "react";
import ServiceSearchProvider from "../../components/ServiceProviderSearch";
import AvailableServices from "../../components/AvailableServices";

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
        </>
    );
};

export default Home;