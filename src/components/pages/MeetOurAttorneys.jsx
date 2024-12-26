import React, { useEffect, useState } from "react";

const MeetOurAttorneys = () => {
    const [attorneys, setAttorneys] = useState([]);

    useEffect(() => {
        // Fetch data from the public folder
        fetch("/attorney.json")
            .then((res) => res.json())
            .then((data) => setAttorneys(data))
            .catch((err) => console.error("Error fetching attorney data:", err));
    }, []);

    return (
        <div className="py-12 bg-gray-100">
            <div className="container mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800">Meet Our Attorneys</h2>
                    <p className="text-gray-600 mt-4">
                        Our experienced attorneys are here to provide expert legal advice and representation.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {attorneys.length > 0 ? (
                        attorneys.map((attorney) => (
                            <div
                                key={attorney._id}
                                className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition duration-300"
                            >
                                <img
                                    src={attorney.imageUrl}
                                    alt={attorney.serviceName}
                                    className="w-32 h-32 mx-auto rounded-full mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800">{attorney.serviceName}</h3>
                                <p className="text-gray-600">{attorney.serviceArea}</p>
                                <p className="mt-4 text-gray-500">
                                    {attorney.description}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-3">
                            No attorneys available at the moment. Please check back later.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MeetOurAttorneys;
