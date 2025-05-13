// src/services/userService.ts
import axios from "axios";

const API_URL = "http://localhost:4000/api"; // Cambia esto si tu backend está en otro puerto o URL

// Usuarios (Users)
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching users: " + error.message);
    } else {
      throw new Error("Error fetching users: An unknown error occurred");
    }
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching user by id: " + error.message);
    } else {
      throw new Error("Error fetching user by id: An unknown error occurred");
    }
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/users/createUser`, userData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error creating user: " + error.message);
    } else {
      throw new Error("Error creating user: An unknown error occurred");
    }
  }
};

export const updateUser = async (id: number, userData: any) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error updating user: " + error.message);
    } else {
      throw new Error("Error updating user: An unknown error occurred");
    }
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error deleting user: " + error.message);
    } else {
      throw new Error("Error deleting user: An unknown error occurred");
    }
  }
};

// Trámites (Tramites)
export const getAllTramites = async () => {
  try {
    const response = await axios.get(`${API_URL}/tramites`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching tramites: " + error.message);
    } else {
      throw new Error("Error fetching tramites: An unknown error occurred");
    }
  }
};

export const getTramiteById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/tramites/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching tramite by id: " + error.message);
    } else {
      throw new Error("Error fetching tramite by id: An unknown error occurred");
    }
  }
};

export const createTramite = async (tramiteData: any) => {
  console.log("Creating tramite with data:", tramiteData);
  try {
    const response = await axios.post(`${API_URL}/tramites/createProcess`, tramiteData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error creating tramite: " + error.message);
    } else {
      throw new Error("Error creating tramite: An unknown error occurred");
    }
  }
};

export const updateTramite = async (id: number, tramiteData: any) => {
    console.log("Updating tramite with ID:", id, "and data:", tramiteData);
  try {
    const response = await axios.put(`${API_URL}/tramites/${id}`, tramiteData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error updating tramite: " + error.message);
    } else {
      throw new Error("Error updating tramite: An unknown error occurred");
    }
  }
};

export const updateTramiteStatus = async (id: number, status: string) => {
  try {
    const response = await axios.patch(`${API_URL}/tramites/${id}/status`, { status });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error updating tramite status: " + error.message);
    } else {
      throw new Error("Error updating tramite status: An unknown error occurred");
    }
  }
};

export const deleteTramite = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/tramites/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error deleting tramite: " + error.message);
    } else {
      throw new Error("Error deleting tramite: An unknown error occurred");
    }
  }
};
