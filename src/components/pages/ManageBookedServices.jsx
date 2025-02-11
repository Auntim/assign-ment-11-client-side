import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../provider/AuthProviders"; // Adjust the path based on your project structure
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProviders";

const ManageBookedServices = () => {
    const { user } = useContext(AuthContext); // Access the logged-in user
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://web-app-server-site.vercel.app/bookings?providerEmail=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setBookings(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching bookings:", error);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const handleStatusChange = (id, newStatus) => {
        fetch(`https://web-app-server-site.vercel.app/bookings/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ serviceStatus: newStatus }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire("Success!", "Service status updated.", "success");
                    setBookings((prevBookings) =>
                        prevBookings.map((booking) =>
                            booking._id === id ? { ...booking, serviceStatus: newStatus } : booking
                        )
                    );
                }
            })
            .catch((error) => console.error("Error updating status:", error));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="px-12 dark:bg-medium mx-auto">
            <h1 className="text-2xl font-bold mb-6 dark:text-white mt-12">Manage Booked Services</h1>
            {bookings.length === 0 ? (
                <p>No services found for you as the provider.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="p-4 border rounded shadow-md">
                            <h2 className="text-lg font-semibold">{booking.serviceName}</h2>
                            <p>Customer: {booking.userName}</p>
                            <p>Status: {booking.serviceStatus}</p>
                            <div className="mt-2">
                                <select
                                    value={booking.serviceStatus}
                                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                    className="p-2 border rounded"
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

export default ManageBookedServices;
