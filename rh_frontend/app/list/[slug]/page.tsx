import DisplayRestaurants from "@/components/DisplayRestaurant";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import GetRandomRestaurant from "@/components/GetRandomRestaurant";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import InsertRestaurantButton from "@/components/InsertRestaurantButton";

export default async function Page({ params }: { params: { slug: string } }) {
  // fetch all restaurants in list
  // return on page
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    redirect("/");
  }
  // Add back button to list directory
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full sm:max-w-md gap-2">
      <BackButton />
      <div className="flex flex-col gap-4">
        <DisplayRestaurants
          slug={params.slug}
          supabase_session={session.session}
        />
        <InsertRestaurantButton
          slug={params.slug}
          supabase_session={session.session}
        />
        <GetRandomRestaurant slug={params.slug} />
      </div>
    </div>
  );
}
