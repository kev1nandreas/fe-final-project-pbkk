/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "@tanstack/react-query";
import { MAIN_ENDPOINT } from "../main/endpoint";
import { get, post } from "../main/call";
import {
  typecastModelsResponse,
  typecastReferencesResponse,
} from "@/types/response";

export const useFetchReferences = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(MAIN_ENDPOINT.Info.Embeddings);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return typecastReferencesResponse((Kind as any).data);
    },
    queryKey: ["fetch.references"],
  }) as any;
};

export const useFetchModels = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(MAIN_ENDPOINT.Info.Models);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return typecastModelsResponse((Kind as any).data);
    },
    queryKey: ["fetch.models"],
  }) as any;
};

export const useAddReferences = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { Kind, OK } = await post(
        MAIN_ENDPOINT.Processing.UploadReferences,
        body
      );

      if (!OK) {
        throw new Error((Kind as { error: string }).error);
      }
      return Kind;
    },
    mutationKey: ["add.references"],
    onSuccess,
    onError,
  });
};
