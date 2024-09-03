import "./App.css";
import Footer from "./components/footer/footer";
import HomeNavbar from "./components/navbar/navbar";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        {/* Header */}
        <HomeNavbar />
        {/* Main Content */}
        <main className="flex-grow bg-gray-300 border-t border-b border-gray-400 flex items-center justify-center">
          {/* Aquí va el contenido principal */}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
