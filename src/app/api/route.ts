import { NextRequest } from "next/server";
import { NEXON_API_BASE_URL } from "@/constants/starData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get("apiKey");
  const count = searchParams.get("count");
  const date = searchParams.get("date");

  if (!apiKey || !count || !date) {
    return new Response("필수 파라미터가 누락되었습니다", { status: 400 });
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
        "x-nxopen-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("error:", error);

    return new Response("서버 오류가 발생했습니다", { status: 500 });
  }
}
