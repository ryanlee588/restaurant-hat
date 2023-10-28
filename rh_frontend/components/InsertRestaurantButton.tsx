"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface insertRestaurantProps {
  slug: string;
  supabase_session: Session | null;
}

export default function InsertRestaurantButton({
  slug,
  supabase_session,
}: insertRestaurantProps) {
  const [restaurant, setRestaurant] = useState("");

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setRestaurant(e.target.value);
  };

  const user_email = supabase_session?.user.email;
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

  const checkListStatus = async (list: string) => {
    const { error, data } = await supabase
      .from("lists")
      .select("open")
      .eq("name", list);
    if (error) {
      console.error("Error checking if list is open:", error);
      return false;
    } else {
      return data ? data[0].open : false;
    }
  };

  const add_restaurant = async (
    list: string,
    user_email: string,
    restaurant: string
  ) => {
    const listEmpty = await checkListEmpty(list);
    const listOpen = await checkListStatus(list);
    if (listOpen) {
      const { error } = await supabase.from("restaurants").insert({
        list: list,
        restaurant: restaurant,
        owner: user_email,
      });
      if (error) {
        console.log("Error adding restaurant to list:", error);
        toast("Error adding restaurant to list! Please try again.");
      } else {
        if (listEmpty) {
          const { error } = await supabase
            .from("lists")
            .update({ owner: user_email })
            .eq("name", list);
          if (error) {
            console.log("Error updating list owner", error);
          }
        }
        toast(
          "Successfully added restaurant to list! Refresh to see updated list."
        );
      }
    } else {
      toast("List is closed! Unable to add anymore restaurants.");
    }
    setRestaurant("");
  };

  return (
    <div>
      <input
        type="text"
        name="list_name"
        id="list_name"
        value={restaurant}
        onChange={handleInputChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
      />
      <button
        type="submit"
        onClick={() =>
          user_email
            ? add_restaurant(slug, user_email, restaurant)
            : add_restaurant(slug, "unauthorized", restaurant)
        }
      >
        Add Restaurant
      </button>
    </div>
  );
}

// function add_restaurant(user_email: string, restaurant: string) {
//   const supabase = createClientComponentClient();
//   useEffect(() => {
//     const add_restaurant_aux = async () => {
//       const { error } = await supabase.from("restaurants").insert({
//         list: restaurant,
//         restaurant: restaurant,
//         owner: user_email,
//       });
//       if (error) {
//         console.log("Error adding restaurant to list:", error);
//         toast("Error adding restaurant to list! Please try again.");
//       } else {
//         toast(
//           "Successfully added restaurant to list! Refresh to see updated list."
//         );
//       }
//     };
//     add_restaurant_aux();
//   });
// }
