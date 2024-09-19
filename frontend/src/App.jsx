import { Navigate, Route, Routes } from "react-router";
import Footer from "./components/footer/footer";
import HomeNavbar from "./components/navbar2/navbar";
import Profile_Cliente from "./pages/profile_cliente/profile-cliente";
//import Home from "./pages/home/home";
import FormLogin from "./pages/auth/Authentication/auth-form";
//import { ProtectedRoute } from "./config/guard";
import ListCard from "./components/listCard/listCard";
import Galeria from "./pages/information/galeria";
import Testimonios from "./pages/information/testimonio";
import Servicios from "./pages/information/servicios";
import QuienesSomos from "./pages/information/qsomos";
import Reservas from "./pages/information/reserva";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <HomeNavbar />
        <main className="flex-grow bg-gray-300 border-t border-b border-gray-400 flex items-center justify-center">
          <Routes>
            <Route exact path="/quienes-somos" element={<QuienesSomos />} />
            <Route exact path="/galeria" element={<Galeria />} />
            <Route exact path="/reserva" element={<Reservas />} />
            <Route exact path="/testimonios" element={<Testimonios />} />
            <Route exact path="/servicios" element={<Servicios />} />
            <Route exact path="/lista-prestaciones" element={<ListCard />} />
            <Route exact path="/perfil-cliente" element={<Profile_Cliente />} />
            <Route exact path="/mascota" element={<Profile_Cliente />} />
            <Route exact path="/login" element={<FormLogin />} />
            <Route path="/registrarse" element={<FormLogin />} />

            {/* <Route
              path="/perfil-cliente"
              element={<ProtectedRoute element={<Profile_Cliente />} />}
            />
            <Route
              path="/mascota"
              element={<ProtectedRoute element={<Profile_Cliente />} />}
            /> */}
            {/* 
            <Route
              path="/perfil-cuidador"
              element={<ProtectedRoute element={<Profile_Carer />} />}
            />
            <Route
              path="/paseo"
              element={<ProtectedRoute element={<Profile_Carer />} />}
            />
            <Route
              path="/referencias"
              element={<ProtectedRoute element={<Profile_Carer />} />}
            />*/}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
