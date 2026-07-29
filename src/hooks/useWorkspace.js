import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createWorkspace,
  deleteWorkspace,
  getSingleWorkspace,
  getWorkspaces,
  updateWorkspace,
} from "../api/workspaceApi";

const QUERY_KEY = "workspaces";


export const useWorkspaces = () => {
  return useQuery({ 
    queryKey: [QUERY_KEY],
    queryFn: getWorkspaces,
  });
};



export const useSingleWorkspace = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => getSingleWorkspace(id),
    enabled: !!id,
  });
};


export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkspace,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
};



export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWorkspace,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
};



export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkspace,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
};