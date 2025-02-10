// import { FaMoon } from "react-icons/fa"
// import { BsSunFill } from 'react-icons/bs'
import { useEffect, useState } from "react"
import { FaSun, FaMoon } from 'react-icons/fa';



function ToggleDark() {
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
        <div className="rounded bg-gray-200 dark:bg-gray-800">
            <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-transparent text-white rounded flex items-center space-x-2"
            >
                {theme === 'light' ? (
                    <>
                        <FaMoon className="w-5 h-5" />

                    </>
                ) : (
                    <>
                        <FaSun className="w-5 h-5" />

                    </>
                )}
            </button>
        </div>
    )
}

export default ToggleDark