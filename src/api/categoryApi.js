// import api from "./api";
import axiosInstance from "./axiosInstance";


export const createCategory = async (data) => {
  const response = await axiosInstance.post("/category", data);
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get("/category");

  return response.data;
};

export const getSingleCategory = async (id) => {
  const response = await axiosInstance.get(`/category/${id}`);

  return response.data;
};

export const updateCategory = async ({ id, data }) => {
  const response = await axiosInstance.put(`/category/${id}`, data);

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/category/${id}`);

  return response.data;
};