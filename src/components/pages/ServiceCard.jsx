import React from 'react'

function ServiceCard({ service }) {
    const { imageUrl, serviceName, price, serviceArea, description, } = service
    return (
        <div>
            <div className="card card-compact bg-base-100 w-90 shadow-xl">
                <figure className='h-52  '>
                    <img className='w-full rounded-lg object-cover'
                        src={imageUrl}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{serviceName}</h2>
                    <p>{description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
