import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const Slide = ({ image, text }) => {
    return (
        <div
            className='w-full bg-center bg-cover h-[38rem]'
            style={{
                backgroundImage: `url(${image})`,
            }}
        >
            <motion.div

                className='flex items-center justify-center w-full h-full bg-gray-900/70'>
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
                        {text}
                    </h1>
                    <br />
                    <Link
                        to='/services'
                    >
                        <motion.button

                            className='w-1/2 md:w-4/12 px-5 py-3 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-500'
                        >Explore more
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default Slide