import axiosInstance from "./axiosInstance";

export const getOperators = async () => {
  const response = await axiosInstance.get("/operators");
  return response.data;
};

export const getOperator = async (id) => {
  const response = await axiosInstance.get(`/operators/${id}`);
  return response.data;
};

export const createOperator = async (data) => {
  const response = await axiosInstance.post("/operators", data);
  return response.data;
};

export const updateOperator = async ({ id, data }) => {
  const response = await axiosInstance.put(`/operators/${id}`, data);
  return response.data;
};

export const deleteOperator = async (id) => {
  const response = await axiosInstance.delete(`/operators/${id}`);
  return response.data;
};