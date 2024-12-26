import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProviders";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const ServiceToDo = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            axios
                .get(`https://web-app-server-site.vercel.app/booked-services?providerEmail=${user.email}`)
                .then((res) => {
                    setBookings(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleStatusChange = (id, status) => {
        axios
            .patch(`https://web-app-server-site.vercel.app/update-booking-status/${id}`, { status })
            .then((res) => {
                if (res.data.success) {
                    setBookings((prev) =>
                        prev.map((booking) =>
                            booking._id === id ? { ...booking, serviceStatus: status } : booking
                        )
                    );
                }
            })
            .catch((err) => console.error(err));
    };

    if (loading) {
        return <p>Loading services...</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <Helmet>
                <title>LEWIO | Service To Do</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-center mb-6">Service To Do</h1>
            {bookings.length === 0 ? (
                <p className="text-center text-gray-500">No services found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="p-4 border rounded shadow hover:shadow-lg transition"
                        >
                            <img
                                src={booking.serviceImage}
                                alt={booking.serviceName}
                                className="w-full h-40 object-cover rounded"
                            />
                            <h2 className="text-lg font-semibold mt-4">{booking.serviceName}</h2>
                            <p className="text-gray-500">Area: {booking.serviceArea}</p>
                            <p className="text-gray-500">Price: ${booking.price}</p>
                            <p className="text-gray-500">Status: {booking.serviceStatus}</p>
                            <div className="mt-4">
                                <label
                                    htmlFor={`status-${booking._id}`}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Update Status:
                                </label>
                                <select
                                    id={`status-${booking._id}`}
                                    className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={booking.serviceStatus}
                                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="working">Working</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServiceToDo;
