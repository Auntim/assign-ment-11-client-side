import React from 'react'
import { Link } from "react-router-dom";


function ServiceCard({ service }) {
    // const { imageUrl, serviceName, price, serviceArea, description, } = service
    return (
        <div className=' bg-purple-100 rounded-xl dark:bg-medium dark:border-2 '>
            <img
                src={service.imageUrl}
                alt={service.serviceName}
                className="w-full h-52 object-cover rounded-lg"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                    Name:  {service.serviceName}
                </h3>
                <p className="text-gray-600 mt-2 text-sm dark:text-white">
                    <span className='text-xl font-semibold'>Description:</span> {service.description.length > 100
                        ? `${service.description.slice(0, 100)}...`
                        : service.description}
                </p>
                <div className="flex items-center mt-4">
                    <img
                        src={service.provider.image}
                        alt={service.provider.name}
                        className="w-10 h-10 rounded-full mr-3 border-2 border-gray-300"
                    />
                    <p className="text-gray-700 font-medium dark:text-white">
                        {service.provider.name}
                    </p>
                </div>
                <p className="text-lg font-bold text-green-500 mt-2 text-start">
                    Price: ${service.price}
                </p>
                <Link
                    to={`/services/${service._id}`}

                    className="mt-4 btn btn-outline text-black px-4 py-2 rounded dark:text-white dark:bg-white flex"
                >
                    View Details
                </Link>
            </div>
        </div>
    )
}

export default ServiceCard
