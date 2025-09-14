"use client"
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { useTheme } from 'next-themes'

export default function ThemeToggler() {
    const { theme, setTheme } = useTheme();
   
    return (
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {
                theme ==="dark" ?<BsFillSunFill className='text-yellow-400'/> :<BsFillMoonFill className='text-brand'/>
            }
        </button>
    )
}
