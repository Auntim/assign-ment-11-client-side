import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const PopularService = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("https://web-app-server-site.vercel.app/services");
                setServices(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching services:", error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500"><LoadingSpinner /></p>;
    }

    return (
        <section className="py-10 ">
            <div className="container mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-3 text-orange-700 dark:text-white">
                    Popular Services
                </h2>
                <p className="text-center text-xl text-gray-800 mb-8 dark:text-white">Discover the most popular services handpicked for you.</p>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 mx-6 md:mx-0">
                    {services.slice(0, 6).map((service) => (
                        <div
                            key={service._id}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-2xl dark:border-2 dark:bg-medium"
                        >
                            <img
                                src={service.imageUrl}
                                alt={service.serviceName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 dark:bg-medium">
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                                    {service.serviceName}
                                </h3>
                                <p className="text-gray-600 mt-2 text-sm dark:text-white">
                                    {service.description.length > 100
                                        ? `${service.description.slice(0, 100)}...`
                                        : service.description}
                                </p>
                                <div className="flex items-center mt-4">
                                    <img
                                        src={service.provider.image}
                                        alt={service.provider.name}
                                        className="w-10 h-10 rounded-full mr-3 border-2 dark:text-white border-gray-300"
                                    />
                                    <p className="text-gray-700 font-medium dark:text-white">
                                        {service.provider.name}
                                    </p>
                                </div>
                                <p className="text-lg font-bold text-green-500 mt-2 ">
                                    Price: ${service.price}
                                </p>
                                <Link
                                    to={`/services/${service._id}`}
                                    className="mt-4  dark:text-white px-4 py-2 rounded btn btn-outline  dark:bg-black"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-left">
                    <Link
                        to="/services"
                        className="bg-gray-800 text-white text-md px-2 py-2 rounded hover:bg-gray-700"
                    >
                        Show All
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularService;
