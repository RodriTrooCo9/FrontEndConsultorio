import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

export const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
        <h1 className='text-3xl font-medium' >Nuestras Especialidades</h1>
        <p className='sm:w-1/3 text-center text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed cupiditate distinctio inventore voluptate ab possimus sequi, fugit ipsum! Labore laudantium corporis qui non. At totam blanditiis alias. Maxime, et consequuntur.</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
           {specialityData.map((item, index) => (
            <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer shrink-0 hover:-translate-y-2.5 transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
              <img className='w-16 sm:w-24 mb-2' src={item.image} />
              <p>{item.speciality}</p>
            </Link>
           ))}

        </div>
    </div>
  )
}
export default SpecialityMenu
