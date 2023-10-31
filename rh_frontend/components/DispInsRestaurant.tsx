"use client";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import DisplayRestaurants from "./DisplayRestaurant";
import InsertRestaurantButton from "./InsertRestaurantButton";

interface RestaurantManagerProps {
  slug: string;
  supabase_session: Session | null;
}

export default function RestaurantManager({
  slug,
  supabase_session,
}: RestaurantManagerProps) {
  const [restaurantStateChange, setRestaurantStateChange] = useState(false);
  return (
    <div className="flex flex-col w-full items-center">
      <DisplayRestaurants
        slug={slug}
        supabase_session={supabase_session}
        restaurantStateChange={restaurantStateChange}
      />
      <InsertRestaurantButton
        slug={slug}
        supabase_session={supabase_session}
        restaurantStateChange={restaurantStateChange}
        setRestaurantStateChange={setRestaurantStateChange}
      />
    </div>
  );
}
