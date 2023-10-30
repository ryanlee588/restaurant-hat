"use client";

import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  const { toast } = useToast();
  if (error) {
    toast({ title: "Error", description: error });
  }
  if (message) {
    toast({ title: "Message", description: message });
  }
  return <></>;
}
