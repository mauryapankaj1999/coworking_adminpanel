import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  showSuccess,
  showError,
} from "../utils/toast";
import { getTestimonials, getTestimonial, createTestimonial, updateTestimonial, deleteTestimonial } from "../api/testimonialApi";

const QUERY_KEY = "testimonials";

// GET ALL
export const useTestimonials = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getTestimonials,
  });
};

// GET SINGLE
export const useSingleTestimonial = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => getTestimonial(id),
    enabled: !!id,
  });
};

// CREATE
export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTestimonial,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });

      showSuccess(
        data.message || "Testimonial Created Successfully"
      );
    },

    onError: (error) => {
      showError(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    },
  });
};

// UPDATE
export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTestimonial,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });

      showSuccess(
        data.message || "Testimonial Updated Successfully"
      );
    },

    onError: (error) => {
      showError(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    },
  });
};

// DELETE
export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTestimonial,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });

      showSuccess(
        data.message || "Testimonial Deleted Successfully"
      );
    },

    onError: (error) => {
      showError(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    },
  });
};