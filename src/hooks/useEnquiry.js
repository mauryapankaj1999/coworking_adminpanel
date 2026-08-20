import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getEnquiryById,deleteEnquiry,getEnquiries,updateEnquiryStatus } from "../api/enquiryService";



export const useEnquiries = () => {
  return useQuery({
    queryKey: ["enquiries"],
    queryFn: getEnquiries,
  });
};

export const useEnquiry = (id) => {
  return useQuery({
    queryKey: ["enquiry", id],
    queryFn: () => getEnquiryById(id),
    enabled: !!id,
  });
};

export const useUpdateEnquiryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEnquiryStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["enquiries"],
      });
    },
  });
};

export const useDeleteEnquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEnquiry,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["enquiries"],
      });
    },
  });
};