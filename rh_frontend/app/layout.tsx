import { ToastContainer } from "react-toastify";
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
      <body className="bg-background text-foreground">
        <main className="flex flex-col items-center min-h-screen justify-center">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <LogOutButton />
          <div className="">Welcome to Restaurant Hat!</div>
          <div className="">{children}</div>
        </main>
      </body>
    </html>
  );
}
