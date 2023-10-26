import BackHomeButton from "@/components/BackHomeButton";
import ListDirectory from "@/components/ListDirectory";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { SetStateAction, useState } from "react";

export default async function directory() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: session } = await supabase.auth.getSession();

  return (
    <div>
      <BackHomeButton />
      <ListDirectory supabase_session={session.session} />
    </div>
  );
}
