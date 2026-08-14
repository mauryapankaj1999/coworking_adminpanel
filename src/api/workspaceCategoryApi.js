import axiosInstance from "./axiosInstance";

export const getCategories = async () => {
  const response = await axiosInstance.get("/workspacecategories");
  return response.data;
};

export const getCategory = async (id) => {
  const response = await axiosInstance.get(`/workspacecategories/${id}`);
  return response.data;
};

export const getCategoryBySlug = async (slug) => {
  const response = await axiosInstance.get(`/workspacecategories/slug/${slug}`);
  return response.data;
};

export const createCategory = async (data) => {
  const response = await axiosInstance.post("/workspacecategories", data);
  return response.data;
};

export const updateCategory = async ({ id, data }) => {
  const response = await axiosInstance.put(`/workspacecategories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/workspacecategories/${id}`);
  return response.data;
};