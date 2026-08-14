import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCategories,
  getCategory,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/workspaceCategoryApi";

export const useCategories = () => {
  return useQuery({
    queryKey: ["workspace-categories"],
    queryFn: getCategories,
  });
};

export const useCategory = (id) => {
  return useQuery({
    queryKey: ["workspace-category", id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });
};

export const useCategoryBySlug = (slug) => {
  return useQuery({
    queryKey: ["workspace-category-slug", slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-categories"],
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
        queryKey: ["workspace-categories"],
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
        queryKey: ["workspace-categories"],
      });
    },
  });
};