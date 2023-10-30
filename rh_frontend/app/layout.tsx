import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import LogOutButton from "@/components/LogOutButton";

export const metadata = {
  title: "Restaurant Hat",
  description: "Your favourite restaurant picker!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ backgroundColor: "black", color: "white" }}
        className="bg-background text-foreground"
      >
        <main className="flex flex-col text-sm md:text-base lg:text-large items-center min-h-screen justify-center gap-4">
          <div className="pb-16">
            <LogOutButton />
          </div>
          <div className="text-sm md:text-base lg:text-large">{children}</div>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
