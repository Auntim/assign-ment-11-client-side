import React from 'react'
import { Helmet } from 'react-helmet-async'
import Carousel from './pages/Carousel'

function Home() {
    return (
        <div>
            <Helmet>
                <title>LEWIO | Home</title>
            </Helmet>
            <section className='mt-24'>
                <Carousel></Carousel>
            </section>
        </div>
    )
}

export default Home
