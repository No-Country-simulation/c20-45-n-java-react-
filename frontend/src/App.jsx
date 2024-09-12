import { Navigate, Route, Routes } from "react-router";
import Footer from "./components/footer/footer";
import HomeNavbar from "./components/navbar2/navbar";
import Profile_Carer from "./pages/profile_carer/profile-carer";
import Profile_Cliente from "./pages/profile_cliente/profile-cliente";
import Home from "./pages/home/home";
import FormLogin from "./pages/auth/Authentication/auth-form";
import { ProtectedRoute } from "./config/guard";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <HomeNavbar />
        <main className="flex-grow bg-gray-300 border-t border-b border-gray-400 flex items-center justify-center">
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/perfil-cliente" element={<Profile_Cliente />} />
            <Route exact path="/mascota" element={<Profile_Cliente />} />
            <Route exact path="/perfil-cuidador" element={<Profile_Carer />} />
            <Route exact path="/paseo" element={<Profile_Carer />} />

            <Route exact path="/login" element={<FormLogin />} />
            <Route path="/registrarse" element={<FormLogin />} />

            {/* <Route
              path="/perfil-cliente"
              element={<ProtectedRoute element={<Profile_Cliente />} />}
            />
            <Route
              path="/mascota"
              element={<ProtectedRoute element={<Profile_Cliente />} />}
            />
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
