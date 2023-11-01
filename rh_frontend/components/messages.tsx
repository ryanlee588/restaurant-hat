"use client";

import { useSearchParams } from "next/navigation";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  return (
    <>
      {error && (
        <p
          title="Error Message"
          className="mt-4 p-4 border border-slate-500 bg-foreground/10 text-white text-center"
        >
          {error}
        </p>
      )}
      {message && (
        <p
          title="Info Message"
          className="mt-4 p-4 border border-slate-500 bg-foreground/10 text-white text-center"
        >
          {message}
        </p>
      )}
    </>
  );
}
