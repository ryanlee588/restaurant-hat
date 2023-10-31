"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { SetStateAction, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";

interface insertRestaurantProps {
  slug: string;
  supabase_session: Session | null;
  restaurantStateChange: any;
  setRestaurantStateChange: any;
}

export default function InsertRestaurantButton({
  slug,
  supabase_session,
  restaurantStateChange,
  setRestaurantStateChange,
}: insertRestaurantProps) {
  const [restaurant, setRestaurant] = useState("");

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setRestaurant(e.target.value);
  };

  const user_email = supabase_session?.user.email;
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const checkListEmpty = async (list: string) => {
    const { data, error } = await supabase.rpc("check_list_empty", {
      list_name: list,
    });
    if (error) {
      return false;
    } else {
      return data;
    }
  };

  const checkListOpen = async (list: string) => {
    const { error, data } = await supabase.rpc("check_list_open", {
      list_name: list,
    });
    if (error) {
      console.error("Error checking if list is open:", error);
      return false;
    } else {
      return data;
    }
  };

  const add_restaurant = async (
    list: string,
    user_email: string,
    restaurant: string
  ) => {
    const listEmpty = await checkListEmpty(list);
    const listOpen = await checkListOpen(list);
    console.log(listOpen);
    if (restaurant != "") {
      if (listOpen) {
        const { error } = await supabase.from("restaurants").insert({
          list: list,
          restaurant: restaurant,
          owner: user_email,
        });
        if (error) {
          console.log("Error adding restaurant to list:", error);
          toast({
            title: "Failed to add restaurant to list",
            description: "Database error. Please try again!",
          });
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
          toast({
            title: "Successfully added restaurant to list",
            description: `Added ${restaurant} to list`,
          });
        }
      } else {
        toast({
          title: "Failed to add restaurant to list",
          description: "List is closed! Unable to add anymore restaurants.",
        });
      }
    } else {
      toast({
        title: "Failed to add restaurant to list",
        description: "Restaurant name cannot be empty",
      });
    }

    setRestaurant("");
    setRestaurantStateChange(!restaurantStateChange);
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full md:w-1/2 lg:w-1/2">
      <input
        type="text"
        name="list_name"
        id="list_name"
        placeholder="Restaurant to Insert"
        value={restaurant}
        onChange={handleInputChange}
        className="mt-1 block w-full px-4 py-2 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
      />
      <Button
        style={{ color: "white" }}
        type="submit"
        className="w-full text-sm md:text-base lg:text-large "
        onClick={() =>
          user_email
            ? add_restaurant(slug, user_email, restaurant)
            : add_restaurant(slug, "unauthorized", restaurant)
        }
      >
        Add Restaurant
      </Button>
    </div>
  );
}
