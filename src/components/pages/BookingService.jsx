import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProviders';

function BookingService({ service, closeModal }) {
    const { user } = useContext(AuthContext);
    const [serviceDate, setServiceDate] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');

    const handleBooking = () => {
        const bookingData = {
            serviceId: service._id,
            serviceName: service.serviceName,
            serviceImage: service.imageUrl,
            providerEmail: service.provider.email,
            providerName: service.provider.name,
            userEmail: user.email,
            userName: user.displayName,
            serviceDate,
            specialInstructions,
            price: service.price,
            serviceStatus: 'pending',
        };

        fetch('https://web-app-server-site.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        })
            .then((res) => res.json())
            .then(() => {
                Swal.fire('Success', 'Booking placed successfully!', 'success');
                closeModal();
            })
            .catch((error) => {
                Swal.fire('Error', 'Failed to book service', 'error');
            });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 m-12 w-11/12 md:w-2/3 lg:w-1/2">
                <h2 className="text-2xl font-semibold mb-4 ">Book Service</h2>

                <div className="grid gap-4">
                    <input
                        type="text"
                        value={service._id}
                        disabled
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        value={service.serviceName}
                        disabled
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        value={service.imageUrl}
                        disabled
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        value={service.provider.email}
                        disabled
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        value={service.provider.name}
                        disabled
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        value={user.email}
                        disabled
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        value={user.displayName}
                        disabled
                        className="input input-bordered"
                    />
                    <input
                        type="date"
                        value={serviceDate}
                        onChange={(e) => setServiceDate(e.target.value)}
                        className="input input-bordered"
                    />
                    <textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="Special Instructions (e.g., address, area, plan)"
                        className="textarea textarea-bordered"
                    ></textarea>
                    <input
                        type="text"
                        value={`$${service.price}`}
                        disabled
                        className="input input-bordered"
                    />
                </div>

                <div className="flex justify-end mb-8 mt-4">
                    <button
                        onClick={handleBooking}
                        className="btn btn-primary"
                    >
                        Purchase
                    </button>
                    <button
                        onClick={closeModal}
                        className="btn btn-secondary ml-4"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookingService;
