"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";

interface ListDirectoryProp {
  supabase_session: Session | null;
}

export default function ListDirectory({ supabase_session }: ListDirectoryProp) {
  const [listName, setListName] = useState("");

  const user = supabase_session?.user;

  const supabase = createClientComponentClient();

  const router = useRouter();

  const { toast } = useToast();

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setListName(e.target.value);
  };

  const deleteList = async (list: string) => {
    const { error } = await supabase.rpc("delete_list", {
      list_name: list,
      user_email: user ? user.email : "",
    });
    if (error) {
      toast({ title: "Error deleting list", description: error.message });
    } else {
      toast({ title: `Successfully deleted list ${list}!` });
    }
    setListName("");
  };

  return (
    <div className="flex-1 w-full flex top-16 flex-col gap-4 items-center text-sm md:text-sm lg:text-md">
      <input
        title="enter_list_name"
        type="text"
        name="enter_list_name"
        id="enter_list_name"
        placeholder="Enter Unique List Name"
        value={listName}
        onChange={handleInputChange}
        className="mt-1 block w-full md:w-1/2 lg:w-1/2 px-4 py-2 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
      />

      <Button
        title="view_create_list_button"
        className="w-full md:w-1/2 lg:w-1/2 text-sm md:text-sm lg:text-md"
        onClick={() => {
          listName != ""
            ? router.push(`/list/${listName}`)
            : toast({
                title: "Error viewing List",
                description: "List name cannot be empty",
              });
        }}
      >
        View List (Creates list if it doesn't exist)
      </Button>
      <Button
        title="delete_list_button"
        variant="destructive"
        className="w-full md:w-1/2 lg:w-1/2 text-sm md:text-base lg:text-large"
        onClick={() => {
          listName != ""
            ? deleteList(listName)
            : toast({
                title: "Error deleting List",
                description: "List name cannot be empty",
              });
        }}
      >
        Delete List
      </Button>
    </div>
  );
}
