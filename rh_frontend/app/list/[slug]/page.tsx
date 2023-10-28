import DisplayRestaurants from "@/components/DisplayRestaurant";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast, ToastContainer } from "react-toastify";
import { cookies } from "next/headers";
import GetRandomRestaurant from "@/components/GetRandomRestaurant";
import { redirect } from "next/navigation";
import LogOutButton from "@/components/LogOutButton";
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
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>List Name: {params.slug}</div>
      <div>
        <BackButton />
        <LogOutButton />
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
    </>
  );
}
