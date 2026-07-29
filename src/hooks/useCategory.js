import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { createCategory } from "../api/categoryApi";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
} from "../api/categoryApi";

const QUERY_KEY = "categories";

export const useCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getCategories,
  });
};

export const useSingleCategory = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => getSingleCategory(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
};