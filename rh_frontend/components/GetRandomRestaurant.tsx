"use client";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { list } from "postcss";
import { useState } from "react";
import { toast } from "react-toastify";

interface GetRandomRestaurantProp {
  slug: string;
}
const supabase = createClientComponentClient();

const checkListEmpty = async (list: string) => {
  const { error, data } = await supabase
    .from("restaurants")
    .select()
    .eq("list", list);
  if (error) {
    console.error("Error checking if list is empty:", error);
    return false;
  } else {
    return data ? data.length == 0 : false;
  }
};

const get_random_restaurant = async (slug: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const listEmpty = await checkListEmpty(slug);
  if (listEmpty) {
    toast("No restaurants in list! Add Restaurant to get random restaurant.");
    return "Get Random Restaurant";
  } else {
    const { error, data } = await supabase.rpc("get_rand_restaurant", {
      given_list: slug,
      user_email: user ? user.email : "",
    });
    console.log(data);
    if (error) {
      toast(error.message);
      return "Get Random Restaurant";
    } else {
      return JSON.stringify(data);
    }
  }
};

export default function GetRandomRestaurant({ slug }: GetRandomRestaurantProp) {
  const [restaurantPick, setRestaurantPick] = useState<string>(
    "Click button to get random restaurant!"
  );
  return (
    <>
      <div>Random Restaurant Pick: {restaurantPick}</div>
      <button
        onClick={() =>
          get_random_restaurant(slug).then((pick) => setRestaurantPick(pick))
        }
      >
        Get Random Restaurant
      </button>
    </>
  );
}
