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

export const useWorkspaceCategories = () => {
  return useQuery({
    queryKey: ["workspace-categories"],
    queryFn: getCategories,
  });
};

export const useWorkspaceCategory = (id) => {
  return useQuery({
    queryKey: ["workspace-category", id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });
};

export const useWorkspaceCategoryBySlug = (slug) => {
  return useQuery({
    queryKey: ["workspace-category-slug", slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug,
  });
};

export const useWorkspaceCreateCategory = () => {
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

export const useWorkspaceUpdateCategory = () => {
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

export const useWorkspaceDeleteCategory = () => {
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