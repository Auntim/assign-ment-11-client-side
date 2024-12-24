import React from 'react'
import { Helmet } from 'react-helmet-async'
import Carousel from './pages/Carousel'
import HotServices from './pages/HotServices'

function Home() {
    return (
        <div>
            <Helmet>
                <title>LEWIO | Home</title>
            </Helmet>
            <section className='mt-24'>
                <Carousel></Carousel>
            </section>
            <section className='mt-12'>
                <HotServices></HotServices>
            </section>
        </div>
    )
}

export default Home
