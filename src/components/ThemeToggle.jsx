import { FaMoon } from "react-icons/fa"
import { BsSunFill } from 'react-icons/bs'
import { useEffect, useState } from "react"

function ThemeToggle() {
    const [darkmode, setDarkmode] = useState(true)

    // Load saved theme
    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme === 'light') setDarkmode(false)
    }, [])

    // Apply theme
    useEffect(() => {
        if (darkmode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem("theme", "light")
        }
    }, [darkmode])

    return (
        <div
            onClick={() => setDarkmode(!darkmode)}
            className="
                w-12 h-12 flex items-center justify-center
                
                rounded-full cursor-pointer
                transition-colors duration-300 
            "
        >
            {darkmode ? (
                <BsSunFill className="text-gray-100" size={20} />
            ) : (
                <FaMoon className="text-white" size={20} />
            )}
        </div>
    )
}

export default ThemeToggle
