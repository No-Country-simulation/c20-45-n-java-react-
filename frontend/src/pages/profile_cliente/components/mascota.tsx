import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button, Input } from "../../../export-components";
import { Select, SelectItem } from "@nextui-org/select";
import { Textarea } from "@nextui-org/input";
import latam_paises from "./latam_paises.json";
import ApiService from "../../../config/ApiService";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { Spinner } from "@nextui-org/spinner";

interface Mascota {
  nombre: string;
  raza: string;
  edad: string;
  genero: string;
  condicionMedica: string;
  vacuna: string;
  comportamiento: string;
  dieta: string;
  imagen: string;
}

const validationSchema = Yup.object({
  nombre: Yup.string().required("El campo nombre es obligatorio"),
  raza: Yup.string().required("La raza es obligatoria"),
  edad: Yup.number().integer().positive().required("La edad es obligatoria"),
  sexo: Yup.string().required("El sexo es obligatorio"),
  condiciones: Yup.string().required(
    "Las condiciones médicas son obligatorias"
  ),
  vacunas: Yup.string().required("Las vacunas son obligatorias"),
  comportamiento: Yup.string().required("El comportamiento es obligatorio"),
  dieta: Yup.string().required("La dieta es obligatoria"),
});

export default function Profile_Mascota() {
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<Mascota | null>(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!userId || !token) {
        console.error("No se encontró token o ID de usuario");
        return;
      }

      try {
        const petResponse = await ApiService.getMascotasByCliente(userId);
        setPet(petResponse);
        console.log("petResponse", petResponse);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageUploadSuccess = (url) => {
    setImageUrl(url);
    console.log("URL:", url);
  };

  const handleSubmit = async (values: Mascota) => {
    const userId = localStorage.getItem("userId");
    const mascotaData = {
      nombre: values.nombre,
      raza: values.raza,
      edad: values.edad,
      genero: values.genero,
      condicionMedica: values.condicionMedica,
      vacuna: values.vacuna,
      comportamiento: values.comportamiento,
      dieta: values.dieta,
      imagen: "imageUrl",
      cliente: {
        id: userId,
      },
    };

    console.log("PETSS:", mascotaData);
    try {
      const response = await ApiService.createMascota(mascotaData);
      console.log("Mascota creada con éxito:", response);
    } catch (error) {
      console.error(
        "Error al crear la mascota:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        nombre: pet?.nombre || "",
        raza: pet?.raza || "",
        edad: pet?.edad || "",
        genero: pet?.genero || "",
        condicionMedica: pet?.condicionMedica || "",
        vacuna: pet?.vacuna || "",
        comportamiento: pet?.comportamiento || "",
        dieta: pet?.dieta || "",
        imagen: pet?.imagen || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div className="flex justify-center font-extrabold text-xl font-mono">
            Información de tu mascota
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1 sm:ml-1">
            <div className="w-full">
              <Field
                as={Input}
                type="text"
                name="nombre"
                variant="faded"
                radius="md"
                label="Nombre"
                className=" mt-2 mr-2"
              />
              <ErrorMessage
                name="nombre"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="w-full">
              <Field
                as={Input}
                type="text"
                name="raza"
                variant="faded"
                radius="md"
                label="Raza"
                className=" mt-2 mr-2"
              />
              <ErrorMessage
                name="raza"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="w-full">
              <Field
                as={Input}
                type="text"
                name="edad"
                variant="faded"
                radius="md"
                label="Edad"
                className="w-full mt-2"
              />
              <ErrorMessage
                name="edad"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="w-full">
              <Field
                as={Input}
                type="text"
                name="genero"
                variant="faded"
                radius="md"
                label="Genero"
                className="mt-2 mr-2"
              />
              <ErrorMessage
                name="genero"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          <div className="w-full">
            <Field
              as={Textarea}
              type="text"
              name="condicionMedica"
              variant="faded"
              radius="md"
              label="Condiciones médicas"
              className=" mt-2"
            />
          </div>

          <div className="flex">
            <Field
              as={Textarea}
              type="text"
              name="vacuna"
              variant="faded"
              radius="md"
              label="Vacunas"
              className="mt-2"
            />
          </div>

          <div className="flex">
            <Field
              as={Textarea}
              type="text"
              name="comportamiento"
              variant="faded"
              radius="md"
              label="Comportamiento"
              className=" mt-2"
            />
          </div>

          <div className="flex">
            <Field
              as={Textarea}
              type="text"
              name="dieta"
              variant="faded"
              radius="md"
              label="Dieta"
              className="mt-2"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isSubmitting ? <Spinner className="mr-2" /> : null}
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
