import axios from "axios";

export default class ApiService {
  static baseURL = "http://localhost:8080";

  //   Token
  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  //   Registro
  static async registerUser(registration) {
    const response = await axios.post(
      `${this.baseURL}/api/cliente/create`,
      registration
    );
    return response.data;
  }

  //   Login
  static async loginUser(loginDetails) {
    const response = await axios.post(
      `${this.baseURL}/auth/login`,
      loginDetails
    );
    return response.data;
  }

  // Autenticacion

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUserCliente() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }


  /*  Buscar usuario */

  // Buscar usuario por ID
  static async getUserById(userId) {
    const response = await axios.get(`${this.baseURL}/api/cliente/${userId}`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  // Eliminar usuario
  static async deleteUser(userId) {
    const response = await axios.delete(
      `${this.baseURL}/api/cliente/delete/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  // Actualizar usuario
  static async updateCliente(id, clienteData) {
    const token = localStorage.getItem("token"); 
    const response = await axios.put(
      `${this.baseURL}/api/cliente/${id}`,
      clienteData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }

  // **Mascotas**

  // Crear mascota
  static async createMascota(mascota) {
    const response = await axios.post(
      `${this.baseURL}/api/mascota/create`,
      mascota,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  // Obtener todas las mascotas
  static async getMascotasByCliente(clienteId) {
    const response = await axios.get(
      `${this.baseURL}/api/mascota/cliente/${clienteId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  // **Prestadores**

  // Crear prestador
  static async createPrestador(prestador) {
    const response = await axios.post(
      `${this.baseURL}/api/prestador/create`,
      prestador,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  // Obtener prestadores disponibles
  static async getAvailablePrestadores() {
    const response = await axios.get(
      `${this.baseURL}/api/prestador/disponibles`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  // **Prestaciones**

  // Crear prestación
  static async createPrestacion(prestacion) {
    const response = await axios.post(
      `${this.baseURL}/api/prestacion/create`,
      prestacion,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  // Obtener todas las prestaciones
  static async getPrestaciones() {
    const response = await axios.get(`${this.baseURL}/api/prestacion`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  // **Turnos**

  // Crear turno
  static async createTurno(turno) {
    const response = await axios.post(
      `${this.baseURL}/api/turno/create`,
      turno,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }
  
// Eliminar turno
  static async deleteTurno(turnoId) {
    const response = await axios.delete(`${this.baseURL}/api/turno/delete/${turnoId}`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  // Obtener turnos de un cliente
  static async getTurnosByCliente(clienteId) {
    const response = await axios.get(
      `${this.baseURL}/api/turno/cliente/${clienteId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  // **Referencias**

  // Crear referencia
  static async createReferencia(referencia) {
    const response = await axios.post(
      `${this.baseURL}/api/referencia/create`,
      referencia,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  // Obtener referencias de un prestador
  static async getReferenciasByPrestador(prestadorId) {
    const response = await axios.get(
      `${this.baseURL}/api/referencia/prestador/${prestadorId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }
}
