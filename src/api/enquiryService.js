import axiosInstance from "./axiosInstance";


export const getEnquiries = async () => {
  const response = await axiosInstance.get("/enquiries");
  return response.data;
};

export const getEnquiryById = async (id) => {
  const response = await axiosInstance.get(`/enquiries/${id}`);
  return response.data;
};

export const updateEnquiryStatus = async ({ id, status }) => {
  const response = await axiosInstance.patch(`/enquiries/${id}/status`, {
    status,
  });
  return response.data;
};

export const deleteEnquiry = async (id) => {
  const response = await axiosInstance.delete(`/enquiries/${id}`);
  return response.data;
};