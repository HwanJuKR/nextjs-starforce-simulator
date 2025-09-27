import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IHistoryResponse, IHistoryParams, IHistoryApiError } from "@/types";

const isHistoryApiError = (error: unknown): error is IHistoryApiError => {
  return !!(
    error &&
    typeof error === "object" &&
    error !== null &&
    "error" in error
  );
};

const fetchHistoryAPI = async (
  params: IHistoryParams
): Promise<IHistoryResponse> => {
  const url = new URL("/api", window.location.origin);
  url.searchParams.append("count", params.count);
  url.searchParams.append("date", params.date);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-nxopen-api-key": params.apiKey,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (e) {
    if (isHistoryApiError(e)) {
      throw e;
    }
    
    throw {
      error: {
        name: "NetworkError",
        message: "네트워크 오류가 발생했습니다",
      },
    } as IHistoryApiError;
  }
};

export const useHistory = (params: IHistoryParams) => {
  const queryClient = useQueryClient();
  const queryKey = ["history", params];

  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery<
    IHistoryResponse,
    IHistoryApiError
  >({
    queryKey,
    queryFn: () => fetchHistoryAPI(params),
    enabled: false,
  });

  const resetData = () => {
    queryClient.removeQueries({ 
      predicate: (query) => query.queryKey[0] === "history"
    });
  };

  return {
    data: data || null,
    error: isHistoryApiError(error) ? error : null,
    isLoading,
    isSuccess,
    isError,
    refetch,
    resetData,
  };
};
