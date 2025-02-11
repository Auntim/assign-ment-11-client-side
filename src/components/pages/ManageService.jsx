import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet-async';
import { AuthContext } from "../../provider/AuthProviders";
import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";



function ManageService() {
    const { user } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch services added by the logged-in user
    useEffect(() => {
        if (user?.email) {
            fetch(`https://web-app-server-site.vercel.app/services?providerEmail=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setServices(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

    // Delete Service
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://web-app-server-site.vercel.app/services/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                "Deleted!",
                                "Your service has been deleted.",
                                "success"
                            );
                            setServices(services.filter((service) => service._id !== id));
                        }
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    // Update Service - Navigate to update page or show modal (depends on your implementation)
    const handleEdit = (id) => {
        // Redirect to edit page
        window.location.href = `/edit-service/${id}`;
    };

    return (
        <div className="px-12 py-12 mx-auto my-10 dark:bg-medium">
            <Helmet>
                <title>LEWIO | Manage-Service</title>
            </Helmet>
            <h1 className="text-3xl font-semibold text-center mt-6 mb-6 dark:text-white">
                Manage Your Services
            </h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading your services...</p>
            ) : services.length === 0 ? (
                <p className="text-center text-gray-500">
                    You have not added any services yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="p-4 bg-white shadow-md rounded-lg border border-gray-200 dark:bg-medium"
                        >
                            <img
                                src={service.imageUrl}
                                alt={service.serviceName}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <h2 className="mt-4 text-lg font-semibold dark:text-white">
                                Name: {service.serviceName}
                            </h2>
                            <p className="text-gray-600 mt-2 dark:text-white">{service.description}</p>
                            <p className="text-gray-600 mt-2 dark:text-white">
                                <strong>Price:</strong>Price: ${service.price}
                            </p>
                            <p className="text-gray-600 mt-2 dark:text-white">
                                <strong>Area:</strong> {service.serviceArea}
                            </p>

                            <div className="mt-4 flex justify-start gap-3">
                                <button
                                    onClick={() => handleEdit(service._id)}
                                    className="px-3 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
                                >
                                    <FaPenToSquare className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={() => handleDelete(service._id)}
                                    className=" dark:text-white rounded btn dark:btn-outline border border-b-2 bg-gray-400 text-white items-center"
                                >
                                    <FaTrashCan className="h-6 w-6 text-orange-800" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ManageService;
