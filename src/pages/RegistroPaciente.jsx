import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
// Importamos el hook para usar el botón de Google
import { useGoogleLogin } from '@react-oauth/google';


const response = await axios.post('http://localhost:8000/api/v1/pacientes/', datosParaBackend);

localStorage.setItem('usuario_clinica', JSON.stringify(response.data));

navigate('/dashboard-paciente');


const RegistroPaciente = () => {

  
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    telefono: '',
    email: '',
    direccion: '',
    password_hash: '',
    confirm_password: ''
  });

  const bgImageUrl = "https://images.unsplash.com/photo-1606811841689-23a2c14240af?q=80&w=1974&auto=format&fit=crop";
  const inputClasses = "w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200";

  // --- LÓGICA DE GOOGLE ---
  const loginConGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // 1. Pedimos a Google los datos del usuario usando el token
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        const googleData = userInfo.data;

        // 2. Generamos una contraseña segura interna (porque el usuario entra con Google)
        // Esto satisface el requisito de tu base de datos sin pedirle pass al usuario
        const dummyPassword = `GoogleSecure_${googleData.sub}`;

        // 3. Rellenamos el formulario automáticamente
        setFormData({
            ...formData,
            nombre: googleData.given_name || '',
            apellido: googleData.family_name || '',
            email: googleData.email,
            password_hash: dummyPassword,
            confirm_password: dummyPassword,
            // Google no da estos datos, así que los dejamos vacíos para que el usuario los llene
            fecha_nacimiento: '', 
            telefono: '', 
            direccion: ''
        });

        // 4. Avisamos al usuario
        Swal.fire({
            title: '¡Datos de Google Cargados!',
            text: 'Hola ' + googleData.given_name + ', por favor completa tu Fecha de Nacimiento, Teléfono y Dirección para finalizar.',
            icon: 'info',
            confirmButtonColor: '#0d9488'
        });

      } catch (error) {
        console.error("Error obteniendo datos de Google", error);
      }
    },
    onError: error => console.log('Login Failed:', error)
  });
  // ------------------------

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password_hash !== formData.confirm_password) {
        Swal.fire({ title: 'Error', text: 'Las contraseñas no coinciden.', icon: 'error', confirmButtonColor: '#0d9488' });
        return;
    }

    // Datos exactos para tu Backend (Models.py)
    const datosParaBackend = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        fecha_nacimiento: formData.fecha_nacimiento,
        telefono: formData.telefono,
        email: formData.email,
        direccion: formData.direccion,
        password_hash: formData.password_hash
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/pacientes/', datosParaBackend);
      
      Swal.fire({
        title: '¡Registrado!',
        text: `Paciente ${response.data.nombre} registrado con éxito.`,
        icon: 'success',
        confirmButtonColor: '#0d9488'
      });
      
      setFormData({
        nombre: '', apellido: '', fecha_nacimiento: '', telefono: '', email: '', direccion: '', password_hash: '', confirm_password: ''
      });

    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'Error al registrar. Verifica que el correo no esté repetido.',
        icon: 'error',
        confirmButtonColor: '#d32f2f'
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 font-sans">
      
      {/* Fondo */}
      <div className="absolute inset-0 z-0 w-full h-full bg-cover bg-center filter blur-sm scale-105" style={{ backgroundImage: `url(${bgImageUrl})` }}></div>
      <div className="absolute inset-0 z-0 bg-teal-900/40 mix-blend-multiply"></div>

      {/* Tarjeta */}
      <div className="relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-t-4 border-teal-500">
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Crea tu Expediente</h2>
          <p className="text-sm text-gray-500 mt-2">Completa tus datos clínicos para registrarte</p>
        </div>

        {/* --- Formulario --- */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className={inputClasses} />
            <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required className={inputClasses} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Input Fecha: Se comporta como texto hasta que haces focus, para mantener el estilo placeholder */}
            <input 
                type="text" 
                onFocus={(e) => (e.target.type = "date")} 
                onBlur={(e) => (e.target.value === "" ? e.target.type = "text" : null)}
                name="fecha_nacimiento" 
                placeholder="Fecha Nacimiento" 
                value={formData.fecha_nacimiento} 
                onChange={handleChange} 
                required 
                className={inputClasses} 
            />
            <input type="tel" name="telefono" placeholder="Teléfono / Celular" value={formData.telefono} onChange={handleChange} required className={inputClasses} />
          </div>

          <input type="text" name="direccion" placeholder="Dirección de domicilio" value={formData.direccion} onChange={handleChange} required className={inputClasses} />

          <input 
            type="email" 
            name="email" 
            placeholder="Correo electrónico" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className={`${inputClasses} ${formData.password_hash.startsWith('GoogleSecure') ? 'bg-gray-200 cursor-not-allowed' : ''}`}
            readOnly={formData.password_hash.startsWith('GoogleSecure')} // Bloqueamos email si viene de Google
          />

          {/* Ocultamos los campos de contraseña si el usuario viene de Google para limpiar la interfaz */}
          {!formData.password_hash.startsWith('GoogleSecure') && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input type="password" name="password_hash" placeholder="Contraseña" value={formData.password_hash} onChange={handleChange} required className={inputClasses} />
                <input type="password" name="confirm_password" placeholder="Confirmar pass" value={formData.confirm_password} onChange={handleChange} required className={inputClasses} />
              </div>
          )}

          <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 transition duration-200 mt-4">
            {formData.password_hash.startsWith('GoogleSecure') ? 'Completar Registro Google' : 'Registrar Paciente'}
          </button>
        </form>

        {/* --- Botones Sociales --- */}
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500 rounded">O regístrate con</span></div>
            </div>
            <div className="flex gap-4 mt-4">
                <button className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1877F2] hover:bg-[#166fe5]">
                    <FaFacebookF className="mr-2"/> Facebook
                </button>
                
  
                <button 
                    type="button"
                    onClick={() => loginConGoogle()} 
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#DB4437] hover:bg-[#c23321]"
                >
                    <FaGoogle className="mr-2"/> Google
                </button>
            </div>
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-6">
            ¿Ya tienes cuenta? <a href="#" className="font-medium text-teal-600 hover:underline">Inicia sesión</a>
        </p>

      </div>
    </div>
  );
};

export default RegistroPaciente;