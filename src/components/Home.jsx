import React from 'react'
import { Helmet } from 'react-helmet-async'
import Carousel from './pages/Carousel'
import HotServices from './pages/HotServices'
import PopularService from './pages/PopularService'
import MeetOurAttorneys from './pages/MeetOurAttorneys'
import Reviews from './pages/Reviews'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className='bg-gray-200 dark:bg-medium dark:text-white '>

            <Helmet>
                <title>LEWIO | Home</title>
            </Helmet>
            <section className=''>
                {/* <Carousel></Carousel> */}
                <div className='w-full h-screen overflow-hidden relative'>
                    <video autoPlay muted loop className='' src="videw.mp4"></video>
                </div>
                <div className='absolute top-1/3 md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4'>
                    <h2 className='text-4xl md:text-8xl text-nowrap text-white font-bold'>Devoted To Clients</h2>
                    <p className='text-amber-300 mt-4 text-2xl md:text-5xl font-semibold'>Dedicated to Community</p>
                    <Link to="/services">p
                        <button className='mt-6 px-3 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-500 transition duration-300'> Get Started</button>
                    </Link>
                </div>

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
