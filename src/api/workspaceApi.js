import axiosInstance from "./axiosInstance";

// CREATE
export const createWorkspace = async (data) => {
  const response = await axiosInstance.post(
    "/workspace",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// GET ALL
export const getWorkspaces = async () => {
  const response = await axiosInstance.get("/workspace");

  return response.data;
};

// GET SINGLE
export const getSingleWorkspace = async (id) => {
  const response = await axiosInstance.get(
    `/workspace/${id}`
  );

  return response.data;
};

// UPDATE
export const updateWorkspace = async ({ id, data }) => {
  const response = await axiosInstance.put(
    `/workspace/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// DELETE
export const deleteWorkspace = async (id) => {
  const response = await axiosInstance.delete(
    `/workspace/${id}`
  );

  return response.data;
};