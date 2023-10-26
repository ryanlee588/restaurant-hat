"use client";

import ListDirectory from "@/components/ListDirectory";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { SetStateAction, useState } from "react";

export default async function directory() {
  return (
    <div>
      <ListDirectory />
    </div>
  );

  //   const [listName, setListName] = useState("");
  //   const supabase = createClientComponentClient();
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();

  //   const handleInputChange = (e: {
  //     target: { value: SetStateAction<string> };
  //   }) => {
  //     setListName(e.target.value);
  //   };

  //   return (
  //     <div className="flex-1 w-full flex flex-col gap-20 items-center">
  //       <div>Welcome {user ? user.email : ""}!</div>
  //       <div className="w-1/2">
  //         <input
  //           type="text"
  //           name="list_name"
  //           id="list_name"
  //           value={listName}
  //           onChange={handleInputChange}
  //           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
  //         />
  //       </div>
  //     </div>
  //   );
}
