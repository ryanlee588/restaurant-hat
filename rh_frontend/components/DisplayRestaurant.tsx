"use client";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface pageProps {
  slug: string;
  supabase_session: Session | null;
}

export default function DisplayRestaurants({
  slug,
  supabase_session,
}: pageProps) {
  const [restaurants, setRestaurants] = useState<any[] | String | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkListExists = async () => {
      const { error, data } = await supabase
        .from("lists")
        .select()
        .eq("name", slug);
      if (error) {
        console.error("Error");
        return false;
      } else {
        return data ? data.length > 0 : false;
      }
    };

    const checkListStatus = async () => {
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
      }
      const list_status_local = await checkListStatus();
      //   console.log(list_status_local);
      if (list_status_local) {
        getRestaurants();
      } else {
        setRestaurants(
          "List is closed! Create a new list to get a restaurant pick."
        );
      }
    };
    checkAndGet();
  }, []);

  return <pre>{JSON.stringify(restaurants, null, 2)}</pre>;
}
