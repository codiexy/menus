'use client';
import React from 'react'
import Reviews from '@/components/review/Reviews';
import AboutTab from '@/components/account/AboutTab'
import Menus from '@/components/dish/Menus';
import TopDishes from '@/components/topdish/TopDishes';
import { useParams } from 'next/navigation';
import MenuDetailsPage from '@/components/dish/MenuDetails';

const tabComponents: any = {
    'menu': <Menus />,
    'about': <AboutTab />,
    'reviews': <Reviews />,
    'dishes': <TopDishes />
}
const tabs: any = Object.keys(tabComponents);

function Menu() {
    const { routes }: any = useParams();
    const [route] = routes;

    const value: any = Object.keys(tabs).find(key => tabs[key] === route) || -1;

    return (
        <>
        {
            value < 0 ? (
                <MenuDetailsPage />
            ) 
            : tabComponents[route]  
        }
            
        </>

    )
}

export default Menu