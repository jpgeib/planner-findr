import React, { useEffect } from "react";

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
            <h1>Home Page</h1>
        </>
    );
};

export default Home;