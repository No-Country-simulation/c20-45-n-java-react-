import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

class FirebaseService {
  constructor() {
    this.storage = getStorage();
  }

  async put(file) {
    const storageRef = ref(this.storage, `images/${file.name}`);

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

  async get(filename) {
    const storageRef = ref(this.storage, filename);

    try {
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error al obtener la URL de descarga:", error);
      throw error;
    }
  }

  async delete(filename) {
    const storageRef = ref(this.storage, filename);

    try {
      await deleteObject(storageRef);
      return { result: true, message: "Archivo eliminado exitosamente" };
    } catch (error) {
      console.error("Error al eliminar el archivo:", error);
      throw new Error("Error al eliminar el archivo");
    }
  }
}

export const firebaseService = new FirebaseService();
