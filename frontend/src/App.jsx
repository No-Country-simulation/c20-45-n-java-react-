import Footer from "./components/footer/footer";
import HomeNavbar from "./components/navbar2/navbar";
import Form from "./pages/auth/Authentication/auth-form";
import Profile_Carer from "./pages/profile_carer/profile-carer";
import Profile_Cliente from "./pages/profile_cliente/profile-cliente";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        {/* Header */}
        <HomeNavbar />
        {/* Main Content */}
        <main className="flex-grow bg-gray-300 border-t border-b border-gray-400 flex items-center justify-center">
          <Profile_Carer />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
