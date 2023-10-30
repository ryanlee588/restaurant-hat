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

const get_random_restaurant = async (toast: any, slug: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const listEmpty = await checkListEmpty(slug);
  if (listEmpty) {
    toast({
      title: "Failed to get random restaurant",
      description:
        "No restaurants in list! Add Restaurant to get random restaurant.",
    });
    return "Get Random Restaurant";
  } else {
    const { error, data } = await supabase.rpc("get_rand_restaurant", {
      given_list: slug,
      user_email: user ? user.email : "",
    });
    console.log(data);
    if (error) {
      toast({
        title: "Failed to get random restaurant",
        description: error.message,
      });
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
            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
        {/* <div
          style={{ color: "white" }}
          className="bg-gray-700 border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 w-full"
        >
          Random Restaurant Pick: {restaurantPick}
        </div> */}
      </AlertDialog>
    </div>
  );
}
