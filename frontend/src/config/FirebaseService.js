import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default async function uploadFile(file) {
  const storageRef = ref(Storage, `images/${file.name}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);

    if (snapshot.state === "success") {
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } else {
      throw new Error("Error al cargar el archivo");
    }
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    throw error;
  }
}
