import React, { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function HotServices() {

    const [services, setService] = useState([])
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/lawyer.json")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    useEffect(() => {
        fetch('https://web-app-server-site.vercel.app/services')
            .then(res => res.json())
            .then(data => setService(data))

    }, [])
    return (
        <div>
            <div className='text-center items-center my-6 '>
                <h1 className='text-2xl md:text-4xl font-semibold text-orange-700 mb-4 dark:text-white'>All Hot Service of the Day!!</h1>
                <p className='text-[15px] opacity-70 text-gray-800 dark:text-white'>Credibly generate empowered scenarios via sticky e-markets. Completely revolutionize go forward core competencies <br /> for sustainable e-services. Enthusiastically generate open-source.</p>

            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-11/12 mx-auto dark:text-white">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="p-4 dark:bg-slate-950 border rounded-xl shadow cursor-pointer hover:shadow-lg transition hover:scale-105"
                        onClick={() => navigate(`/category/${cat.id}`)}
                    >
                        <img src={cat.image} className="w-96 h-52 object-cover rounded items-center text-center" />
                        <h2 className="text-start mt-6 font-semibold dark:text-white">Category : {cat.category}</h2>
                    </div>
                ))}
            </div>

            {/* <div className='w-11/12 mx-auto my-12 grid grid-cols-1 md:grid-cols-3  gap-2 md:gap-4 lg:gap-4 rounded-md'>
                {
                    services.slice(0, 6).map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div> */}
        </div>
    )
}

export default HotServices
