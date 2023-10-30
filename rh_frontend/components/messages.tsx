"use client";

import { useSearchParams } from "next/navigation";
// import { useToast } from "@/components/ui/use-toast";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  // const { toast } = useToast();
  // if (error) {
  //   toast({ title: "Error", description: error });
  // }
  // if (message) {
  //   toast({ title: "Message", description: message });
  // }
  return (
    <>
      {error && (
        <p className="mt-4 p-4 bg-gray-700 text-foreground text-center">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-4 p-4 bg-gray-700 text-foreground text-center">
          {message}
        </p>
      )}
    </>
  );
}
