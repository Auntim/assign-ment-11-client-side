import { FaMoon } from "react-icons/fa"
import { BsSunFill } from 'react-icons/bs'
import { useEffect, useState } from "react"



function ThemeToggle() {
    const [darkmode, setDarkmode] = useState(true)

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme === 'dark') setDarkmode(true)
    }, [])

    useEffect(() => {
        if (darkmode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem("theme", "dark")
        }
        else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem("theme", "light")
        }
    }, [darkmode])


    return (
        <div className="relative w-16 h-8 flex items-center dark:bg-gray-800 bg-violet-500 cursor-pointer rounded-full p-1"
            onClick={() => setDarkmode(!darkmode)}>
            <FaMoon
                className={`text-white rounded-full transition-opacity duration-300 ${darkmode ? 'opacity-100' : 'opacity-0'}`}
                size={18}
            />            <div className="absolute bd-white  w-6 h-6 rounded-full sha transform transition-transform duration-300"
                style={darkmode ? { left: '2px' } : { right: '2px' }}>

            </div>
            <BsSunFill
                className={`ml-auto text-yellow-400 transition-opacity duration-300 ${darkmode ? 'opacity-0' : 'opacity-100'}`}
                size={18}
            />


        </div>

    )
}

export default ThemeToggle