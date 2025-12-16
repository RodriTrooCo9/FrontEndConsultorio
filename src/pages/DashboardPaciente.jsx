import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaTooth, FaCalendarCheck, FaClipboardList, FaWallet, 
  FaSearch, FaBell, FaMoon, FaUserCircle, FaSignOutAlt 
} from 'react-icons/fa';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar 
} from 'recharts';

const DashboardPaciente = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  
  // ESTADOS PERSONALES
  const [misStats, setMisStats] = useState({
    citasPendientes: 0,
    citasCompletadas: 0,
    gastoTotal: 0,
    tratamientosActivos: 0
  });

  const [misGraficos, setMisGraficos] = useState([]);

  useEffect(() => {
    // 1. VERIFICAR QUIÉN ESTÁ CONECTADO
    const userStored = localStorage.getItem('usuario_clinica');
    
    if (!userStored) {
      navigate('/'); // Si no se registró, lo manda al inicio
      return;
    }

    const userObj = JSON.parse(userStored);
    setUsuario(userObj);

    // 2. OBTENER Y FILTRAR DATOS SOLO DE ESTE PACIENTE
    const fetchPersonalData = async () => {
        try {
            // Pedimos todas las citas y tratamientos (Idealmente el backend debería filtrar, 
            // pero lo haremos aquí para que funcione rápido con tu backend actual).
            const [citasRes, tratamientosRes] = await Promise.all([
                axios.get('http://localhost:8000/api/v1/citas/'),
                axios.get('http://localhost:8000/api/v1/tratamientos/')
            ]);

            // --- FILTRADO INTELIGENTE (LA CLAVE) ---
            // Solo nos quedamos con las citas donde cita.paciente == userObj.id
            const misCitas = citasRes.data.filter(c => c.paciente === userObj.id);
            
            // Calculamos estadísticas personales
            const pendientes = misCitas.filter(c => c.estado === 'Reservada' || c.estado === 'Confirmada').length;
            const completadas = misCitas.filter(c => c.estado === 'Completada').length;
            
            // Simulamos búsqueda de tratamientos vinculados a mis citas (Lógica simplificada)
            // En un futuro harás: axios.get(`api/v1/tratamientos/?paciente=${userObj.id}`)
            const gastos = 1500; // Simulado hasta que conectemos pagos
            const activos = 2;   // Simulado

            setMisStats({
                citasPendientes: pendientes,
                citasCompletadas: completadas,
                gastoTotal: gastos,
                tratamientosActivos: activos
            });

            // Preparamos datos para el gráfico (Historial de este paciente)
            setMisGraficos([
                { name: 'Ene', gasto: 0, dolor: 2 },
                { name: 'Feb', gasto: 300, dolor: 5 },
                { name: 'Mar', gasto: 150, dolor: 3 }, // Datos ejemplo
                { name: 'Abr', gasto: 800, dolor: 1 },
                { name: 'May', gasto: 200, dolor: 0 },
            ]);

        } catch (error) {
            console.error("Error cargando datos personales", error);
        }
    };

    fetchPersonalData();
  }, [navigate]);

  if (!usuario) return <div className="p-10 text-white bg-slate-900">Cargando perfil...</div>;

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#1e293b] hidden md:flex flex-col border-r border-slate-700">
        <div className="h-16 flex items-center justify-center border-b border-slate-700">
          <h1 className="text-2xl font-bold text-teal-400 flex items-center gap-2">
            <FaTooth /> Armoniza
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
            <p className="text-xs text-slate-400 font-semibold uppercase mb-2 ml-2">Mi Salud</p>
            <NavItem icon={<FaClipboardList />} label="Resumen" active />
            <NavItem icon={<FaCalendarCheck />} label="Mis Citas" />
            <NavItem icon={<FaTooth />} label="Mi Odontograma" />
            <NavItem icon={<FaWallet />} label="Pagos" />
        </nav>

        <div className="p-4 border-t border-slate-700">
            <button 
                onClick={() => { localStorage.removeItem('usuario_clinica'); navigate('/'); }}
                className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition w-full px-4 py-2"
            >
                <FaSignOutAlt /> Cerrar Sesión
            </button>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* HEADER PERSONALIZADO */}
        <header className="h-16 bg-[#1e293b] border-b border-slate-700 flex justify-between items-center px-8">
            <h2 className="text-xl font-semibold text-slate-200">Panel del Paciente</h2>

            <div className="flex items-center gap-6">
                <button className="text-slate-400 hover:text-white relative">
                    <FaBell />
                    {misStats.citasPendientes > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
                    )}
                </button>
                <div className="flex items-center gap-3 pl-6 border-l border-slate-700">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-white">{usuario.nombre} {usuario.apellido}</p>
                        <p className="text-xs text-teal-400">Paciente #{usuario.id}</p>
                    </div>
                    <FaUserCircle className="text-3xl text-slate-400" />
                </div>
            </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-8 space-y-8">
            
            {/* 1. TARJETAS PERSONALES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Próximas Citas" 
                    value={misStats.citasPendientes} 
                    icon={<FaCalendarCheck />} 
                    color="text-blue-500" 
                    trend={misStats.citasPendientes > 0 ? "Pendiente" : "Al día"} 
                />
                <StatCard 
                    title="Historial Citas" 
                    value={misStats.citasCompletadas} 
                    icon={<FaClipboardList />} 
                    color="text-purple-500" 
                    trend="Total" 
                />
                <StatCard 
                    title="Inversión Salud" 
                    value={`$${misStats.gastoTotal}`} 
                    icon={<FaWallet />} 
                    color="text-green-500" 
                    trend="Acumulado" 
                />
                <StatCard 
                    title="Tratamientos" 
                    value={misStats.tratamientosActivos} 
                    icon={<FaTooth />} 
                    color="text-orange-500" 
                    trend="En curso" 
                />
            </div>

            {/* 2. GRÁFICOS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-96">
                
                {/* Gráfico de Evolución */}
                <div className="lg:col-span-2 bg-[#1e293b] rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-200 mb-6">Mi Evolución y Gastos</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={misGraficos}>
                                <defs>
                                    <linearGradient id="colorGasto" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }} />
                                <Area type="monotone" dataKey="gasto" stroke="#14b8a6" fillOpacity={1} fill="url(#colorGasto)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Próxima Acción */}
                <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col justify-center items-center text-center">
                    <div className="bg-teal-900/50 p-6 rounded-full mb-4">
                        <FaCalendarCheck className="text-4xl text-teal-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">¿Necesitas atención?</h3>
                    <p className="text-slate-400 mb-6 text-sm">Reserva tu próxima visita en línea ahora mismo.</p>
                    <button className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition w-full">
                        Agendar Nueva Cita
                    </button>
                </div>

            </div>

        </div>
      </main>
    </div>
  );
};

// --- SUBCOMPONENTES ---
const NavItem = ({ icon, label, active }) => (
    <button className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition duration-200 ${active ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30' : 'text-slate-400 hover:bg-[#0f172a] hover:text-white'}`}>
        <span className="text-xl">{icon}</span>
        <span className="font-medium">{label}</span>
    </button>
);

const StatCard = ({ title, value, icon, color, trend }) => (
    <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden group hover:border-teal-500/50 transition duration-300">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-slate-400 text-sm mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-white">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg bg-[#0f172a] ${color} text-xl group-hover:scale-110 transition`}>
                {icon}
            </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
            <span className="text-teal-400 text-xs font-bold flex items-center">
                ● {trend}
            </span>
            
        </div>
    </div>
);

export default DashboardPaciente;