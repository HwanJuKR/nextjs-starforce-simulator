import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IHistoryResponse, IHistoryApiError, IHistoryParams } from "@/types";

const fetchHistoryAPI = async (
  params: IHistoryParams
): Promise<IHistoryResponse> => {
  const url = new URL("/api", window.location.origin);
  url.searchParams.append("apiKey", params.apiKey);
  url.searchParams.append("count", params.count);
  url.searchParams.append("date", params.date);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorData: IHistoryApiError;

    try {
      errorData = await response.json();
    } catch {
      errorData = {
        error: {
          name: "NetworkError",
          message: "네트워크 오류가 발생했습니다.",
        },
      };
    }

    throw new Error(
      errorData.error.message || "스타포스 기록 조회에 실패했습니다."
    );
  }

  return response.json();
};

export const useHistory = (params: IHistoryParams) => {
  const queryClient = useQueryClient();
  const queryKey = ["history", params];

  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey,
    queryFn: () => fetchHistoryAPI(params),
    enabled: !!params.apiKey && !!params.count && !!params.date,
  });

  const resetData = () => {
    queryClient.removeQueries({ queryKey: ["history"] });
  };

  return {
    data: data || null,
    error: error
      ? {
          error: {
            name: "APIError",
            message: error instanceof Error ? error.message : String(error),
          },
        }
      : null,
    isLoading,
    isSuccess,
    isError,
    refetch,
    resetData,
  };
};
