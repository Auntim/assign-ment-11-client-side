import React, { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard'

function HotServices() {

    const [services, setService] = useState([])

    useEffect(() => {
        fetch('https://web-app-server-site.vercel.app/services')
            .then(res => res.json())
            .then(data => setService(data))

    }, [])
    return (
        <div>
            <div className='text-center items-center my-6 '>
                <h1 className='text-2xl md:text-4xl font-semibold text-orange-700'>All Hot Service of the Day!!</h1>
                <p className='text-[15px] opacity-70 text-gray-800'>Credibly generate empowered scenarios via sticky e-markets. Completely revolutionize go forward core competencies for sustainable e-services. Enthusiastically generate open-source.</p>
            </div>
            <div className='w-11/12 mx-auto my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-md'>
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    )
}

export default HotServices
