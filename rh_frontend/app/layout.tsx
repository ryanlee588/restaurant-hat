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
        <Toaster />
        <main className="flex flex-col w-full text-xs md:text-sm lg:text-md gap-4 items-center min-h-screen justify-center">
          <div className="w-full pb-16">
            <LogOutButton />
          </div>
          <div className="py-4 px-8 items-center text-xs md:text-sm lg:text-md w-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
