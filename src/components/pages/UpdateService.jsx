import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "./LoadingSpinner";

function UpdateService() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatedData, setUpdatedData] = useState({
        serviceName: "",
        price: "",
        serviceArea: "",
        description: "",
        imageUrl: "",
    });

    // Fetch service data
    useEffect(() => {
        fetch(`https://web-app-server-site.vercel.app/services/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setService(data);
                setUpdatedData({
                    serviceName: data.serviceName,
                    price: data.price,
                    serviceArea: data.serviceArea,
                    description: data.description,
                    imageUrl: data.imageUrl,
                });
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [id]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    // Handle form submission
    const handleUpdate = (e) => {
        e.preventDefault();

        fetch(`https://web-app-server-site.vercel.app/services/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Service Updated!",
                        text: "The service details have been successfully updated.",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    navigate("/manage-services");
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to update the service. Please try again.",
                });
            });
    };

    if (loading) {
        return <p className="text-center text-gray-500"><LoadingSpinner /></p>;
    }
    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-semibold text-center mb-6">Update Service</h1>
            <form
                onSubmit={handleUpdate}
                className="max-w-xl mx-auto bg-white p-6 shadow-md rounded"
            >
                <div className="mb-4">
                    <label htmlFor="serviceName" className="block text-gray-700 font-medium">
                        Service Name
                    </label>
                    <input
                        type="text"
                        id="serviceName"
                        name="serviceName"
                        value={updatedData.serviceName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-medium">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={updatedData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="serviceArea" className="block text-gray-700 font-medium">
                        Service Area
                    </label>
                    <input
                        type="text"
                        id="serviceArea"
                        name="serviceArea"
                        value={updatedData.serviceArea}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-medium">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={updatedData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-gray-700 font-medium">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={updatedData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
                >
                    Update Service
                </button>
            </form>
        </div>
    );
}

export default UpdateService;
