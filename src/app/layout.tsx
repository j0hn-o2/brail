import type { Metadata } from "next";
import "./globals.css";
import { ClientThemeProvider } from "@/components/ClientThemeProvider";
import { ConditionalNavigation } from "@/components/ConditionalNavigation";

export const metadata: Metadata = {
  title: "BRAIL - AI Academic Planner",
  description: "An intelligent academic planning and study management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ClientThemeProvider>
          <ConditionalNavigation />
          <main className="min-h-screen overflow-y-auto">
            {children}
          </main>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
