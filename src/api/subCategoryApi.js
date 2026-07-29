import axiosInstance from "./axiosInstance";

// CREATE
export const createSubCategory = async (data) => {
  const response = await axiosInstance.post(
    "/sub-category",
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
export const getSubCategories = async () => {
  const response = await axiosInstance.get("/sub-category");

  return response.data;
};

// GET SINGLE
export const getSingleSubCategory = async (id) => {
  const response = await axiosInstance.get(
    `/sub-category/${id}`
  );

  return response.data;
};

// UPDATE
export const updateSubCategory = async ({ id, data }) => {
  const response = await axiosInstance.put(
    `/sub-category/${id}`,
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
export const deleteSubCategory = async (id) => {
  const response = await axiosInstance.delete(
    `/sub-category/${id}`
  );

  return response.data;
};

export const getSubCategoriesByCategory = async (categoryId) => {
  const response = await axiosInstance.get(
    `/sub-category/category/${categoryId}`
  );

  return response.data;
};