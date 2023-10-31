"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface GetRandomRestaurantProp {
  slug: string;
}
const supabase = createClientComponentClient();

const checkListEmpty = async (list: string) => {
  const { error, data } = await supabase.rpc("check_list_empty", {
    list_name: list,
  });
  if (error) {
    console.error("Error checking if list is empty:", error);
    return false;
  } else {
    return data;
  }
};

const get_random_restaurant = async (slug: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const listEmpty = await checkListEmpty(slug);
  if (listEmpty) {
    return "No restaurants in list! Add Restaurant to get random restaurant.";
  } else {
    const { error, data } = await supabase.rpc("get_rand_restaurant", {
      list_name: slug,
      user_email: user ? user.email : "",
    });
    console.log(data);
    if (error) {
      return "Failed to get random restaurant: " + error.message;
    } else {
      const json_object = JSON.stringify(data);
      return JSON.parse(json_object);
    }
  }
};

export default function GetRandomRestaurant({ slug }: GetRandomRestaurantProp) {
  const [restaurantPick, setRestaurantPick] = useState<string>("");
  return (
    <div className="w-full md:w-1/2 lg:w-1/2 gap-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="w-full text-sm md:text-base lg:text-large "
            onClick={() =>
              get_random_restaurant(slug).then((pick) =>
                setRestaurantPick(pick)
              )
            }
          >
            Get Random Restaurant
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Random Restaurant Pick</AlertDialogTitle>
            <AlertDialogDescription>{restaurantPick}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
