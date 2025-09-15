import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function WeatherIndicator() {
    const [temp, setTemp] = useState("");

    useEffect(() => {
        const fetchTemp = async () => {
            try {
                const key = "323b1855618b4e86842124823251509";
                const location = "Bhubaneswar";
                const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`
                const res = await axios.get(url)
                setTemp(res?.data?.current?.temp_c)
                console.log(res?.data?.current?.temp_c)
            } catch (error) {
                console.error("Error fetching temp", error)
            }
        }
        fetchTemp()
        const interval = setInterval(fetchTemp, 5 * 60 * 1000) // every 5 mins
        return ()=> clearInterval(interval)
    },[])

    return (
        <div>
            <p className='text-sm'>Bhubaneswar {temp}° C</p>
        </div>
    )
}
