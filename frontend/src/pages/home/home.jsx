import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/perfil-cliente" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold">Bienvenido a Pata Amiga</h1>
      <div className="flex mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => navigate("/login")}
        >
          Iniciar Sesión
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/registrarse")}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
