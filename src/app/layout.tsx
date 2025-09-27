import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "jotai";
import QueryProvider from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "스타포스 강화 시뮬레이터",
  description: "스타포스 강화 시뮬레이터",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return (
    <html lang="ko">
      <body>
        <Provider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
