import React from 'react'
import { Link } from "react-router-dom";


function ServiceCard({ service }) {
    // const { imageUrl, serviceName, price, serviceArea, description, } = service
    return (
        <div>
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
    )
}

export default ServiceCard
