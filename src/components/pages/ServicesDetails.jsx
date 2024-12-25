import React from 'react'
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';


function ServicesDetails() {
    const service = useLoaderData()
    console.log(service)
    return (
        <div>
            <Helmet>
                <title>LEWIO | Details</title>
            </Helmet>
            rgrg
        </div>
    )
}

export default ServicesDetails
