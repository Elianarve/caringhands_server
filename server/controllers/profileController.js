import axios from "axios";

const API_URL_PROFILE = "http://localhost:5000/profiles"; // Asegúrate de que esta URL sea correcta

export const getProfileById = async (id) => {
    try {
        const response = await axios.get(`${API_URL_PROFILE}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateProfile = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL_PROFILE}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createProfile = async (user) => {
    try {
        const response = await axios.post(API_URL_PROFILE, user);
        return response.data;
    } catch (error) {
        throw new Error('Error al crear el usuario: ' + error.message);
    }
};