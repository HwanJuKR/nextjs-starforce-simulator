import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "jotai";

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
          {children}
        </Provider>
      </body>
    </html>
  );
}
