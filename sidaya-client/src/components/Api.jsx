import axios from "axios";

// Ganti dengan URL API sesuai kebutuhan
// const API_URL = 'https://sidaya-api.onrender.com/api';
// const API_URL = 'https://sidaya-prisma-api.onrender.com/api';
const API_URL = "http://localhost:30000/api";

// Fungsi untuk mendapatkan semua data dari tabel tertentu
export const getAllData = async (table) => {
  try {
    const response = await axios.get(`${API_URL}/${table}`);
    const data = response.data;
    return data;
  } catch (error) {
    // window.location.href = '/bad-request';
    console.error("Error:", error);
    return null;
  }
};

// Fungsi untuk mendapatkan data berdasarkan ID dari tabel tertentu
export const getDataById = async (table, id) => {
  try {
    const response = await axios.get(`${API_URL}/${table}/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// Fungsi untuk membuat data baru pada tabel tertentu
export const createData = async (table, newData) => {
  try {
    const response = await axios.post(`${API_URL}/${table}`, newData);
    const createdData = response.data;
    return createdData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// Fungsi untuk mengubah data pada tabel tertentu
export const editData = async (table, id, updatedData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/${table}/${id}`,
      updatedData
    );
    const editedData = response.data;
    return editedData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// Fungsi untuk menghapus data pada tabel tertentu
export const deleteData = async (table, id) => {
  try {
    await axios.delete(`${API_URL}/${table}/${id}`);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error("Error:", error);
  }
};

// Fungsi untuk mendapatkan data yang akan ditampilkan di Select Option
export const getOptionData = async (table, field) => {
  try {
    const data = await getAllData(table);
    return data.map((item) => ({ value: item.id, label: item[field] }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Fungsi untuk mendapatkan semua data dari tabel tertentu
export const activeArea = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/activity/active/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    // window.location.href = '/bad-request';
    console.error("Error:", error);
    return null;
  }
};

// Fungsi untuk mendapatkan semua data dari tabel tertentu
export const getActivity = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/activity/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    // window.location.href = '/bad-request';
    console.error("Error:", error);
    return null;
  }
};

// Fungsi untuk mendapatkan semua data dari tabel tertentu
export const getDetailActivity = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/activity/get-detail/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// Fungsi untuk mendapatkan semua data dari tabel tertentu
export const setIsCompleted = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/activity/complete/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
