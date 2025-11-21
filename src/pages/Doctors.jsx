import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const {specialty} = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()

  const {doctors} = useContext(AppContext)

  const applyFilter = () => {
    if (specialty) {
      setFilterDoc(doctors.filter(doc => doc.speciality === specialty))
    }else{
      setFilterDoc(doctors)
    }
  }
  useEffect(()=>{
    applyFilter()

  },[doctors,specialty])


  return (
    <div>
      <p className='text-gray-600' >Busca tu especialidad.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Cirugías de terceros molares</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Cirugías simples</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Cirugías de dientes retenidos</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Implantes</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Curaciones</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Prótesis fija removible</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Tratamiento de conducto uniradicular</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Tratamiento de conducto biradicular</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Tratamiento de conducto multiradicular</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Limpieza</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Fluorizaciones</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Ortodoncia</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Ortopedia</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Botox</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Rinomodelación</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Relleno de labios</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Plasma rico en plaquetas</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Bioestimuladores de colágeno</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Hilos de PDO</p>
          <p onClick={()=> specialty === '' ? navigate('/doctors') : navigate('/doctors/')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>PDRN y exosomas</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
                <div 
                
                    className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' 
                    key={index}
                    onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0,0) }} 
                >
                    <img className='bg-blue-50 w-full' src={item.image} alt="" />
                    <div className='p-4'>
             
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                            <p>Available</p>
                        </div>

                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))

          }
        </div>
      </div>
    </div>
  )
}

export default Doctors