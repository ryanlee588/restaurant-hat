import LogOutButton from "@/components/LogOutButton";
import ListDirectory from "@/components/ListDirectory";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { SetStateAction, useState } from "react";

export default async function directory() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    redirect("/");
  }

  return (
    <div className="flex-1 w-full flex top-16 flex-col gap-20 items-center">
      <ListDirectory supabase_session={session.session} />
    </div>
  );
}
