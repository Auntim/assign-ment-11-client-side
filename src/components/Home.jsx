import React from 'react'
import { Helmet } from 'react-helmet-async'
import Carousel from './pages/Carousel'
import HotServices from './pages/HotServices'
import PopularService from './pages/PopularService'
import MeetOurAttorneys from './pages/MeetOurAttorneys'
import Reviews from './pages/Reviews'

function Home() {
    return (
        <div className='bg-gray-200'>
            <Helmet>
                <title>LEWIO | Home</title>
            </Helmet>
            <section className=''>
                <Carousel></Carousel>
            </section>
            <section className='mt-12'>
                <HotServices></HotServices>
            </section>
            <section className='mt-12'>
                <MeetOurAttorneys></MeetOurAttorneys>
            </section>
            <section mt-12>
                <PopularService></PopularService>
            </section>
            <section className='mt-6'>
                <Reviews />
            </section>
        </div>
    )
}

export default Home
