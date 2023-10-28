"use client";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface pageProps {
  slug: string;
  supabase_session: Session | null;
}

export default function DisplayRestaurants({
  slug,
  supabase_session,
}: pageProps) {
  const [restaurants, setRestaurants] = useState<any[] | String | null>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkListExists = async () => {
      const { error, data } = await supabase
        .from("lists")
        .select()
        .eq("name", slug);
      if (error) {
        console.error("Error checking if list exists:", error);
        return false;
      } else {
        return data ? data.length > 0 : false;
      }
    };

    // const checkListStatus = async () => {
    //   const { error, data } = await supabase
    //     .from("lists")
    //     .select("open")
    //     .eq("name", slug);
    //   if (error) {
    //     console.error("Error checking if list is open:", error);
    //     return true;
    //   } else {
    //     return data ? data[0].open : true;
    //   }
    // };

    const getRestaurants = async () => {
      const { error, data } = await supabase
        .from("restaurants")
        .select("restaurant")
        .eq("list", slug);
      if (error) {
        console.error("Error getting restaurants:", error);
      } else {
        const restaurantStrings = data.map((item) => item.restaurant);
        setRestaurants(restaurantStrings);
      }
    };

    const checkAndGet = async () => {
      const listExists = await checkListExists();
      if (!listExists) {
        const { error } = await supabase.from("lists").insert({
          name: slug,
          open: true,
          owner: supabase_session?.user.email,
        });
        if (error) {
          console.log("Error creating list", error);
          // toast("Error creating list. Please retry!");
        } else {
          console.log("no error");
          toast(
            `List with name ${slug} was not found. List with name ${slug} created succesfully!`
          );
        }
      }
      await getRestaurants();
    };
    checkAndGet();
  }, []);

  return <pre>{JSON.stringify(restaurants, null, 2)}</pre>;
}
