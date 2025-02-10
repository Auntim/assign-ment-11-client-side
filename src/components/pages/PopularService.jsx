import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
        return <p className="text-center text-gray-500">Loading services...</p>;
    }

    return (
        <section className="py-10 ">
            <div className="container mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-3 text-orange-700">
                    Popular Services
                </h2>
                <p className="text-center text-xl text-gray-800 mb-8">Discover the most popular services handpicked for you.</p>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 mx-6 md:mx-0">
                    {services.slice(0, 6).map((service) => (
                        <div
                            key={service._id}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-2xl"
                        >
                            <img
                                src={service.imageUrl}
                                alt={service.serviceName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-700">
                                    {service.serviceName}
                                </h3>
                                <p className="text-gray-600 mt-2 text-sm">
                                    {service.description.length > 100
                                        ? `${service.description.slice(0, 100)}...`
                                        : service.description}
                                </p>
                                <div className="flex items-center mt-4">
                                    <img
                                        src={service.provider.image}
                                        alt={service.provider.name}
                                        className="w-10 h-10 rounded-full mr-3 border-2 border-gray-300"
                                    />
                                    <p className="text-gray-700 font-medium">
                                        {service.provider.name}
                                    </p>
                                </div>
                                <p className="text-lg font-bold text-green-500 mt-2">
                                    ${service.price}
                                </p>
                                <Link
                                    to={`/services/${service._id}`}
                                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        to="/services"
                        className="bg-gray-800 text-white text-xl px-6 py-3 rounded hover:bg-gray-700"
                    >
                        Show All
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularService;
