import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
// import { createSubCategory } from "../api/subCategoryApi";

import {
  createSubCategory,
  deleteSubCategory,
  getSingleSubCategory,
  getSubCategories,
  getSubCategoriesByCategory,
  updateSubCategory,
} from "../api/subCategoryApi";

const QUERY_KEY = "sub-categories";

// GET ALL
export const useSubCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getSubCategories,
  });
};

// GET SINGLE
export const useSingleSubCategory = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => getSingleSubCategory(id),
    enabled: !!id,
  });
};

// CREATE
export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
};

// UPDATE
export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSubCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
};

// DELETE
export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
};

export const useSubCategoriesByCategory = (categoryId) => {
  return useQuery({
    queryKey: [QUERY_KEY, "by-category", categoryId],
    queryFn: () => getSubCategoriesByCategory(categoryId),
    enabled: !!categoryId,
  });
};