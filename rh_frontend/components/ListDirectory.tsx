"use client";

import {
  Session,
  SupabaseClient,
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";

interface ListDirectoryProp {
  supabase_session: Session | null;
}

export default function ListDirectory({ supabase_session }: ListDirectoryProp) {
  const [listName, setListName] = useState("");

  const user = supabase_session?.user;

  const router = useRouter();

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setListName(e.target.value);
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div>Welcome {user ? user.email : ""}!</div>
      <div className="w-1/2">
        <input
          type="text"
          name="list_name"
          id="list_name"
          value={listName}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
        />
      </div>
      <button
        onClick={() => {
          router.push(`/list/${listName}`);
        }}
      >
        View List (New List will be created if it does not exist.)
      </button>
    </div>
  );
}
