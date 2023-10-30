"use client";

import {
  Session,
  SupabaseClient,
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";

interface ListDirectoryProp {
  supabase_session: Session | null;
}

export default function ListDirectory({ supabase_session }: ListDirectoryProp) {
  const [listName, setListName] = useState("");

  const user = supabase_session?.user;

  const supabase = createClientComponentClient();

  const router = useRouter();

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setListName(e.target.value);
  };

  const deleteList = async (list: string) => {
    const { error } = await supabase.rpc("delete_list", {
      user_email: user ? user.email : "",
      list: list,
    });
    if (error) {
      toast(error.message);
    } else {
      toast(`Successfully deleted list "${list}"!`);
    }
    setListName("");
  };

  return (
    <div className="flex-1 w-full flex top-16 flex-col gap-4 items-center">
      <input
        type="text"
        name="list_name"
        id="list_name"
        placeholder="Enter List Name"
        value={listName}
        onChange={handleInputChange}
        className="mt-1 block w-full px-4 py-2 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
      />

      <button
        className="bg-gray-700 border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 w-full"
        onClick={() => {
          listName != "" ? router.push(`/list/${listName}`) : null;
        }}
      >
        View List (New List will be created if it does not exist.)
      </button>
      <button
        className="bg-red-700 border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 w-full"
        onClick={() => {
          listName != "" ? deleteList(listName) : null;
        }}
      >
        Delete List
      </button>
    </div>
  );
}
