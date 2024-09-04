import Footer from "./components/footer/footer";
import HomeNavbar from "./components/navbar2/navbar";
import Form from "./pages/auth/Authentication/auth-form";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <HomeNavbar />
        <main className="flex-grow bg-gray-300 border-t border-b border-gray-400 flex items-center justify-center">
          <Form />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
