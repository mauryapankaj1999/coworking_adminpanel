import axiosInstance from "./axiosInstance";

// Get all blogs
export const getBlogs = async () => {
  const response = await axiosInstance.get("/blog");
  return response.data;
};

// Get single blog by ID
export const getBlog = async (id) => {
  const response = await axiosInstance.get(`/blog/${id}`);
  return response.data;
};

// Get single blog by slug
export const getBlogBySlug = async (slug) => {
  const response = await axiosInstance.get(`/blog/slug/${slug}`);
  return response.data;
};

// Create blog
export const createBlog = async (data) => {
  const response = await axiosInstance.post("/blog", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Update blog
export const updateBlog = async (id, data) => {
  const response = await axiosInstance.put(`/blog/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete blog
export const deleteBlog = async (id) => {
  const response = await axiosInstance.delete(`/blog/${id}`);
  return response.data;
};