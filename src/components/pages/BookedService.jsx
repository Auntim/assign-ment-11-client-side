import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../provider/AuthProviders';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';


function BookedService() {
    const { user } = useContext(AuthContext)
    const [bookedServices, setBookedServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://web-app-server-site.vercel.app/bookings?userEmail=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setBookedServices(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

    return (
        <div>
            <Helmet>
                <title>LEWIO | Booked-Services</title>
            </Helmet>
            <div className="px-12 dark:bg-medium mx-auto pt-12">
                <h1 className="text-3xl font-semibold text-center pt-6 my-6 dark:text-white">
                    My Booked Services
                </h1>

                {loading ? (
                    <p className="text-cecter"> <LoadingSpinner /></p>
                ) : bookedServices.length === 0 ? (
                    <p className="text-center text-gray-500">
                        You have not booked any services yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookedServices.map((service) => (
                            <div
                                key={service._id}
                                className="p-4  shadow-md rounded-lg mb-6 border dark:bg-medium dark:text-white border-gray-200"
                            >
                                <img
                                    src={service.serviceImage}
                                    alt={service.serviceName}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <h2 className="mt-4 text-lg font-semibold dark:text-white">
                                    {service.serviceName}
                                </h2>
                                <p className="text-gray-600 mt-2 dark:text-white">
                                    <strong>Price:</strong> ${service.price}
                                </p>
                                <p className="text-gray-600 dark:text-white">
                                    <strong>Date:</strong> {service.serviceDate || "N/A"}
                                </p>
                                <p className="text-gray-600 dark:text-white">
                                    <strong>Special Instructions:</strong>{" "}
                                    {service.specialInstructions || "None"}
                                </p>

                                <div className="mt-4 flex items-center space-x-4">
                                    <img
                                        src={service.providerImage}
                                        alt={service.providerName}
                                        className="w-10 h-10 rounded-full border"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{service.providerName}</p>
                                        <p className="text-sm text-gray-500">
                                            {service.providerEmail}
                                        </p>
                                    </div>
                                </div>
                                <Link to='/dashboard/manage-service'>
                                    <button className='btn btn-outline text-black text-[14px] p-2 mt-4 dark:bg-white dark:btn dark:btn-outline'>Manage Book</button>
                                </Link>
                            </div>

                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default BookedService
