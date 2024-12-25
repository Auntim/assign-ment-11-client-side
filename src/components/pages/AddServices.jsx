import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProviders";
import { Helmet } from 'react-helmet-async';


const AddServices = () => {
    const { user } = useContext(AuthContext); // Get user information from Firebase Auth
    const [serviceData, setServiceData] = useState({
        imageUrl: "",
        serviceName: "",
        price: "",
        serviceArea: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleAddService = async (e) => {
        e.preventDefault();

        // Construct service data
        const newService = {
            ...serviceData,
            provider: {
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
            },
        };

        try {
            // Send service data to the database
            const response = await fetch("http://localhost:5000/services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newService),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Service Added",
                    text: "Your service has been successfully added!",
                });
                // Clear form
                setServiceData({
                    imageUrl: "",
                    serviceName: "",
                    price: "",
                    serviceArea: "",
                    description: "",
                });
            } else {
                throw new Error("Failed to add service");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
            <Helmet>
                <title>LEWIO | Add-services</title>
            </Helmet>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Service</h1>
            <form onSubmit={handleAddService} className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={serviceData.imageUrl}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Service Name</label>
                    <input
                        type="text"
                        name="serviceName"
                        value={serviceData.serviceName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={serviceData.price}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Service Area</label>
                    <input
                        type="text"
                        name="serviceArea"
                        value={serviceData.serviceArea}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={serviceData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Add Service
                </button>
            </form>
        </div>
    );
};

export default AddServices;
