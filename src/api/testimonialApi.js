// import axiosInstance from "../../config/axios";
import axiosInstance from "./axiosInstance";


// CREATE TESTIMONIAL
export const createTestimonial = async (formData) => {
  const { data } = await axiosInstance.post(
    "/testimonial",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// GET ALL TESTIMONIALS
export const getTestimonials = async () => {
  const { data } = await axiosInstance.get("/testimonial");
  return data;
};

// GET SINGLE TESTIMONIAL
export const getTestimonial = async (id) => {
  const { data } = await axiosInstance.get(`/testimonial/${id}`);
  return data;
};

// UPDATE TESTIMONIAL
export const updateTestimonial = async ({ id, formData }) => {
  const { data } = await axiosInstance.put(
    `/testimonial/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// DELETE TESTIMONIAL
export const deleteTestimonial = async (id) => {
  const { data } = await axiosInstance.delete(
    `/testimonial/${id}`
  );

  return data;
};