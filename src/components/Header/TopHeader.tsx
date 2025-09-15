"use client"
import React from 'react'
import Button from '../Button/Button'
import { BsFacebook, BsYoutube, BsTwitterX, BsInstagram } from "react-icons/bs";
import ThemeToggler from './ThemeToggler';
import WeatherIndicator from '../WeatherIndicator/WeatherIndicator';

export default function TopHeader() {
    return (
        <div className='flex justify-between border-b border-amber-400 py-2'>
            <div className='flex items-center gap-2'>
                <Button label="Live TV" />
                <Button label="Channel No" />
                <WeatherIndicator/>
            </div>
            <div className='flex items-center justify-between gap-2'>
                <Button label="Mega Quiz" />
                <Button label="Subscribe Argus" />
                <div className='flex items-center gap-2'>
                    <BsFacebook className='text-[#1877f2] cursor-pointer' />
                    <BsYoutube className='text-[#ff0000] cursor-pointer' />
                    <BsTwitterX className='text-[#8c8c8c] cursor-pointer' />
                    <BsInstagram className='text-[#e4405f] cursor-pointer' />
                </div>
                <div>
                    Odia | English
                </div>
                <ThemeToggler/>
            </div>
        </div>
    )
}