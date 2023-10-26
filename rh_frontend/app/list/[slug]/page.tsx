import BackHomeButton from "@/components/BackHomeButton";
import DisplayRestaurants from "@/components/DisplayRestaurant";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { toast, ToastContainer } from "react-toastify";
import { cookies } from "next/headers";
import GetRandomRestaurant from "@/components/GetRandomRestaurant";

const get_random_restaurant = async (slug: string) => {
  const supabase = createClientComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error, data } = await supabase.rpc("get_rand_restaurant", {
    given_list: slug,
    user_email: user ? user.email : "",
  });
  console.log(data);
  if (data == null) {
    error
      ? toast(error.message)
      : toast("Error getting random restaurant! Database might be down.");
    return "Get Random Restaurant";
  } else {
    return JSON.stringify(data);
  }
};

export default async function Page({ params }: { params: { slug: string } }) {
  // fetch all restaurants in list
  // return on page
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: session } = await supabase.auth.getSession();
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
      <div>
        <BackHomeButton />

        <DisplayRestaurants
          slug={params.slug}
          supabase_session={session.session}
        />
        <GetRandomRestaurant slug={params.slug} />
        <div>My Post: {params.slug}</div>
      </div>
    </>
  );
}
