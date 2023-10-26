"use client";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { toast } from "react-toastify";

interface GetRandomRestaurantProp {
  slug: string;
}
const supabase = createClientComponentClient();

const checkListStatus = async (slug: string) => {
  const { error, data } = await supabase
    .from("lists")
    .select("open")
    .eq("name", slug);
  if (error) {
    console.error("Error");
    return true;
  } else {
    return data ? data[0].open : true;
  }
};

const get_random_restaurant = async (slug: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ListOpen = await checkListStatus(slug);

  // if list is open, get random restaurant, else toast saying list has been closed

  const { error, data } = await supabase.rpc("get_rand_restaurant", {
    given_list: slug,
    user_email: user ? user.email : "",
  });
  console.log(data);
  if (!ListOpen) {
    toast("List is closed! Create a new list to get a restaurant pick.");
    return "Get Random Restaurant";
  }
  if (data == null) {
    error
      ? toast(error.message)
      : toast(
          "No restaurants in list! Add Restaurant to get random restaurant,"
        );
    return "Get Random Restaurant";
  } else {
    return JSON.stringify(data);
  }
};

export default function GetRandomRestaurant({ slug }: GetRandomRestaurantProp) {
  const [restaurantPick, setRestaurantPick] = useState<string>(
    "Get Random Restaurant"
  );
  return (
    <button
      onClick={() =>
        get_random_restaurant(slug).then((pick) => setRestaurantPick(pick))
      }
    >
      {restaurantPick}
    </button>
  );
}
