"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
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

const get_random_restaurant = async (toast: any, slug: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const listEmpty = await checkListEmpty(slug);
  if (listEmpty) {
    return "No restaurants in list! Add Restaurant to get random restaurant.";
  } else {
    const { error, data } = await supabase.rpc("get_rand_restaurant", {
      given_list: slug,
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
  const { toast } = useToast();
  return (
    <div className="flex flex-row w-full gap-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="secondary"
            style={{ color: "white" }}
            className="bg-orange-700 w-full"
            onClick={() =>
              get_random_restaurant(toast, slug).then((pick) =>
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
