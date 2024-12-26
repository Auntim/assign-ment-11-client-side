import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { Helmet } from 'react-helmet-async';


const AllServices = () => {
    const [services, setServices] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);

    useEffect(() => {
        fetch("https://web-app-server-site.vercel.app/services")
            .then((res) => res.json())
            .then((data) => {
                setServices(data);
                setFilteredServices(data);
            });
    }, []);

    useEffect(() => {
        const lowerCaseSearchText = searchText.toLowerCase();
        const filtered = services.filter(service =>
            service.serviceName.toLowerCase().includes(lowerCaseSearchText)
        );
        setFilteredServices(filtered);
    }, [searchText, services]);

    return (
        <div className="w-11/12 mx-auto">
            <Helmet>
                <title>LEWIO | Services</title>
            </Helmet>
            <h1 className="text-3xl font-bold my-6 text-center">All Services</h1>

            <div className="mb-6 text-center">
                <input
                    type="text"
                    placeholder="Search for a service..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="p-2 border w-full md:w-1/2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center rounded-lg">
                {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                        <ServiceCard key={service._id} service={service} />
                    ))
                ) : (
                    <p className="text-center text-gray-600">No services found for your search.</p>
                )}
            </div>
        </div>
    );
};

export default AllServices;
