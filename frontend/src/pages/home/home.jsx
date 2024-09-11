import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Slider from "react-slick";
import ApiService from "../../config/ApiService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  // const navigate = useNavigate();
  // const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [prestaciones, setPrestaciones] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsAuthenticated(!!token);
  // }, []);

  // if (isAuthenticated === null) {
  //   return null;
  // }

  // if (isAuthenticated) {
  //   return <Navigate to="/perfil-cliente" replace />;
  // }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  useEffect(() => {
    const fetchPrestaciones = async () => {
      try {
        const data = await ApiService.getPrestaciones();
        setPrestaciones(data);
      } catch (error) {
        console.error("Error al cargar las prestaciones", error);
      }
    };

    fetchPrestaciones();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      {prestaciones.length > 0 ? (
        <Slider {...settings}>
          {prestaciones.map((prestacion) => (
            <div key={prestacion.id} className="prestacion-item">
              <h3>{prestacion.nombre}</h3>
              <p>{prestacion.descripcion}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <Slider {...settings}>
          <div className="bg-red-700">
            <h1 className="bg-black">1</h1>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      )}
    </div>
  );
}
