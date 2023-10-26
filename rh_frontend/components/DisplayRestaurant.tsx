import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface pageProps {
  slug: string;
}

export default function DisplayRestaurants({ slug }: pageProps) {
  const [restaurants, setRestaurants] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
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
      const list_status_local = await checkListStatus();
      console.log(list_status_local);
      if (list_status_local == true) {
        getRestaurants();
      } else {
        setRestaurants(null);
      }
    };
    checkAndGet();
  }, []);

  return <pre>{JSON.stringify(restaurants, null, 2)}</pre>;
}
