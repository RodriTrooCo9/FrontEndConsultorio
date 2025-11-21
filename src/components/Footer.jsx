import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Footer() {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/*--seccion alta----*/}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit, amet consectetur 
                    adipisicing elit. Architecto deserunt quas,
                     tempore consectetur numquam velit eum dicta eaque 
                     soluta qui nisi enim ducimus
                     minus pariatur in quo molestiae eius repellat.</p>

            </div>
            {/*--media seccion---*/}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-400'>
                    <li>Home</li>
                    <li>Doctors</li>
                    <li>About us</li>
                    <li>Contact</li>
                    <li>Privacy policy</li>
                </ul>

            </div>
            {/*--bajada seccion--- */}
            <div> 
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-400'>
                    <li>+591 70000000</li>
                    <li>armonizalp@gmail.com</li>
                </ul>
    
            </div>
        </div>
        {/*---------------text------------------ */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>© 2025 Armoniza.LP. All rights reserved.</p>

        </div>
    </div>
  )
}

export default Footer