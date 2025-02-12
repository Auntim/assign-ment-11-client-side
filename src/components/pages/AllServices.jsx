import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from "./LoadingSpinner";
// import { AuthContext } from "../../provider/AuthProviders";


const AllServices = () => {
    // const { loading } = useContext(AuthContext)
    const [services, setServices] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch("https://web-app-server-site.vercel.app/services")
            .then((res) => res.json())
            .then((data) => {
                setServices(data);
                setLoading(false);
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

    if (loading) {
        return <LoadingSpinner />;
    }


    return (
        <div className="px-12 py-12  mx-auto dark:bg-medium">
            <Helmet>
                <title>LEWIO | Services</title>
            </Helmet>
            <h1 className="text-3xl font-bold my-6 text-center mt-12 dark:text-white">All Services</h1>

            <div className="mb-6 text-center">
                <input
                    type="text"
                    placeholder="Search for a service..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="p-2 border w-full md:w-1/2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 dark:bg-medium text-center rounded-lg bg-white">
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
