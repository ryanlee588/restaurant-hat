"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      className="absolute left-8 top-8 text-sm md:text-base lg:text-large"
      onClick={() => router.push(`/directory`)}
      // className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>{" "}
      Back
    </Button>
  );
}
