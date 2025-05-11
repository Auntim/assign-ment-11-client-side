import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import BookingService from './BookingService';
// import BookedService from './BookedService';


function ServicesDetails() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const service = useLoaderData()
    // console.log(service)

    const {
        imageUrl,
        serviceName,
        description,
        price,
        serviceArea,
        provider: { name: providerName, image: providerImage, email: providerEmail },
    } = service;
    return (
        <div className='dark:bg-black'>
            <Helmet>
                <title>LEWIO | Details</title>
            </Helmet>
            <div className="w-10/12 mx-auto pt-24 ">
                <div className="text-center mb-3">
                    <h1 className="text-3xl font-bold dark:text-white">{serviceName}</h1>
                    <p className="text-lg text-gray-500 dark:text-white">{serviceArea}</p>
                    <div className='mt-1 h-1 w-32 bg-green-700 rounded-md text-center mx-auto'></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Service Image */}
                    <img src={imageUrl} alt={serviceName} className="w-full rounded-lg shadow-lg" />

                    {/* Service Details */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3 dark:text-white">Service Details</h2>
                        <p className="text-gray-700 mb-4 dark:text-white">{description}</p>
                        <h3 className="text-xl font-bold mb-2 dark:text-white">Price: ${price}</h3>

                        {/* Service Provider Details */}
                        <div className="flex items-center gap-4 mt-6">
                            <img
                                src={providerImage}
                                alt={providerName}
                                className="w-16 h-16 rounded-full border-2 border-gray-300"
                            />
                            <div>
                                <h4 className="text-lg font-bold dark:text-white">{providerName}</h4>
                                <p className="text-gray-500 text-sm dark:text-white">{providerEmail}</p>
                            </div>
                        </div>

                        {/* Book Now Button */}
                        <button onClick={() => setIsModalOpen(true)} className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Book Now
                        </button>
                    </div>
                </div>
                {isModalOpen && (
                    <BookingService
                        service={service}
                        closeModal={() => setIsModalOpen(false)}
                    ></BookingService>
                )}
            </div>
            );
        </div>
    )
}

export default ServicesDetails
