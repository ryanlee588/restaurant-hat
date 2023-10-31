import ListDirectory from "@/components/ListDirectory";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import icon from "../icon.png";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function directory() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    redirect("/");
  }

  return (
    <div className="flex-1 w-full flex top-16 flex-col gap-4 items-center text-sm md:text-sm lg:text-md">
      <h2 className="flex flex-col w-full md:w-1/2 lg:w-1/2 items-center gap-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        <Image
          width="200"
          height="200"
          src={icon}
          alt="Restaurant Hat Logo"
        ></Image>
      </h2>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Simply go to an existing list (or create a new one) 📋
      </h3>
      <ListDirectory supabase_session={session.session} />
    </div>
  );
}
