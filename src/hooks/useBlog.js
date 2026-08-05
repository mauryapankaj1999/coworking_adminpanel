import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBlogs,
  getBlog,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../api/blogApi";

// Get all blogs
export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
};

// Get single blog by ID
export const useSingleBlog = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id),
    enabled: !!id,
  });
};

// Get single blog by slug
export const useBlogBySlug = (slug) => {
  return useQuery({
    queryKey: ["blog", "slug", slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  });
};

// Create blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

// Update blog
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateBlog(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", variables.id] });
    },
  });
};

// Delete blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
