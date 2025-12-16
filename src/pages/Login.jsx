import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <p>
  ¿No tienes una cuenta?{' '}
  <Link to="/registro-paciente" className="text-teal-600 underline font-bold">
    Regístrate aquí
  </Link>
</p>
    </div>
  )
}

export default Login