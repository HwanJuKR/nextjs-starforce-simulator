import { NextRequest } from "next/server";
import { NEXON_API_BASE_URL } from "@/constants/starData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiKey = request.headers.get("x-nxopen-api-key");
  const count = searchParams.get("count");
  const date = searchParams.get("date");

  if (!apiKey || !count || !date) {
    return Response.json(
      {
        error: {
          name: "ValidationError",
          message: "필수 파라미터가 누락되었습니다",
        },
      },
      { status: 400 }
    );
  }

  const nexonUrl = new URL(
    `${NEXON_API_BASE_URL}/maplestory/v1/history/starforce`
  );
  nexonUrl.searchParams.append("count", count);
  nexonUrl.searchParams.append("date", date);

  try {
    const response = await fetch(nexonUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-nxopen-api-key": apiKey,
      },
    });

    if (!response.ok) {
      let errorMessage = "Nexon API 요청에 실패했습니다";

      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || errorMessage;
      } catch {}

      return Response.json(
        {
          error: {
            name: "NexonAPIError",
            message: errorMessage,
          },
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error("API Error:", error);

    return Response.json(
      {
        error: {
          name: "ServerError",
          message: "서버 오류가 발생했습니다",
        },
      },
      { status: 500 }
    );
  }
}
