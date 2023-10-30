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
        <main className="flex flex-col w-full text-xs md:text-sm lg:text-md items-center min-h-screen justify-center">
          <div className="pb-16">
            <LogOutButton />
          </div>
          <div className="pt-4 items-center text-xs md:text-sm lg:text-md w-full">
            {children}
          </div>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
