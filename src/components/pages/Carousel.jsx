// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import bgimg1 from "../../assets/images/carousel1.jpg";
import bgimg2 from "../../assets/images/carousel2.jpg";
import bgimg3 from "../../assets/images/carousel3.jpg";

import Slide from '../Slide'

export default function Carousel() {
    return (
        <div className='py-6'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className='mySwiper'
            >
                <SwiperSlide>
                    <Slide
                        image={bgimg1}
                        text='Get Your Best Lawyer Done in minutes'
                    ></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bgimg2}
                        text='Get Your Attorney lovers  Done in minutes'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bgimg3}
                        text='Start Your Best Lawyer Campaigns up and running'
                    />
                </SwiperSlide>
            </Swiper>

        </div>
    )
}