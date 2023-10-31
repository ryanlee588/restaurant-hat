import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import GetRandomRestaurant from "@/components/GetRandomRestaurant";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import icon from "../../icon.png";
import RestaurantManager from "@/components/DispInsRestaurant";

export default async function Page({ params }: { params: { slug: string } }) {
  // fetch all restaurants in list
  // return on page
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    redirect("/");
  }
  const slug = decodeURI(params.slug);
  // Add back button to list directory
  return (
    <>
      <BackButton />
      <div className="flex flex-col w-full gap-4 items-center justify-center gap-2">
        <h2 className="flex flex-col w-full md:w-1/2 lg:w-1/2 items-center gap-2 scroll-m-20 border-b pb-2 tracking-tight first:mt-0">
          <Image
            width="200"
            height="200"
            src={icon}
            alt="Restaurant Hat Logo"
          ></Image>
        </h2>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Share the awesomeness of this list with your pals simply by revealing
          its name. It's that easy! 🍕😋
        </h3>
        <div className="flex flex-col w-full items-center gap-4">
          <RestaurantManager slug={slug} supabase_session={session.session} />
          <GetRandomRestaurant slug={slug} />
        </div>
      </div>
    </>
  );
}
