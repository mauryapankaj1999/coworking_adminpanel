import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getOperators,
  getOperator,
  createOperator,
  updateOperator,
  deleteOperator,
} from "../api/operatorApi";

export const useOperators = () => {
  return useQuery({
    queryKey: ["operators"],
    queryFn: getOperators,
  });
};

export const useOperator = (id) => {
  return useQuery({
    queryKey: ["operator", id],
    queryFn: () => getOperator(id),
    enabled: !!id,
  });
};

export const useCreateOperator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOperator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operators"] });
    },
  });
};

export const useUpdateOperator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOperator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operators"] });
    },
  });
};

export const useDeleteOperator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOperator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operators"] });
    },
  });
};