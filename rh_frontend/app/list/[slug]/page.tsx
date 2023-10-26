"use client";
import BackHomeButton from "@/components/BackHomeButton";
import DisplayRestaurants from "@/components/DisplayRestaurant";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast, ToastContainer } from "react-toastify";

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

export default function Page({ params }: { params: { slug: string } }) {
  // fetch all restaurants in list
  // return on page
  const [restaurantPick, setRestaurantPick] = useState<string>(
    "Get Random Restaurant"
  );
  return (
    <div>
      <BackHomeButton />
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
      <DisplayRestaurants slug={params.slug} />
      <button
        onClick={() =>
          get_random_restaurant(params.slug).then((pick) =>
            setRestaurantPick(pick)
          )
        }
      >
        {restaurantPick}
      </button>
      <div>My Post: {params.slug}</div>
    </div>
  );
}
