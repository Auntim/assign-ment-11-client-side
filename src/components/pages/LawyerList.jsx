import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LawyerList() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [experienceFilter, setExperienceFilter] = useState("");

    useEffect(() => {
        fetch("/lawyer.json")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((c) => c.id === Number(id));
                setCategory(found);
            });
    }, [id]);

    if (!category) return <p className="text-center mt-10">Loading...</p>;

    const filteredLawyers = category.lawyers.filter((l) => {
        if (!experienceFilter) return true;
        const exp = parseInt(l.experience);
        return exp >= Number(experienceFilter);
    });

    return (
        <div className="p-6 mx-auto dark:text-white dark:bg-black pt-20">
            <h1 className="text-3xl font-bold mb-6 mt-6 text-center text-pink-400">
                Here are all {category.category}
            </h1>

            {/* Experience Filter */}
            <div className="w-11/12 mx-auto mb-6">
                <select
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="border px-4 py-2 rounded w-60 dark:bg-black dark:border-gray-600"
                >
                    <option value="">Filter by Experience</option>
                    <option value="3">1–3 years</option>
                    <option value="5">3–5 years</option>
                    <option value="10">5–10 years</option>
                    <option value="11">10+ years</option>
                </select>
            </div>

            <div className="w-11/12 mx-auto space-y-4">
                {filteredLawyers.map((lawyer, index) => (
                    <div
                        key={lawyer.id}
                        className="flex items-center gap-4 p-4 border rounded-xl shadow dark:bg-black hover:shadow-lg transition"
                    >
                        <span className="text-xl font-bold w-10 text-center">{index + 1}.</span>

                        <img
                            src={lawyer.image}
                            className="w-24 h-24 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{lawyer.name}</h2>
                            <p>Experience: {lawyer.experience} years</p>
                            <p>Location: {lawyer.location}</p>

                            {/* Rating */}
                            <p className="text-yellow-500 text-lg mt-1">
                                {"★".repeat(lawyer.rating)}
                                {"☆".repeat(5 - lawyer.rating)}
                            </p>
                        </div>

                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="bg-blue-500 px-3 py-2 rounded-xl" onClick={() => document.getElementById('my_modal_5').showModal()}>Book Now</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box dark:bg-gray-800">
                                <h3 className="font-bold text-lg">Hey! Client</h3>
                                <p className="py-4">Unfortunately This Lawyer is not availble right now...Sorry!</p>
                                <p>See You Soon...</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                ))}
            </div>
        </div>
    );
}
