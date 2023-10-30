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

    const getRestaurants = async () => {
      const { error, data } = await supabase
        .from("restaurants")
        .select("restaurant, owner")
        .eq("list", slug);
      if (error) {
        console.error("Error getting restaurants:", error);
      } else {
        // const restaurantStrings = data.map((item) => item.restaurant);
        setRestaurants(data);
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

  return (
    // <pre>{JSON.stringify(restaurants, null, 2)}</pre>
    <div className="flex w-full items-center">
      {RestaurantsTable(slug, restaurants)}
    </div>
  );
}

function RestaurantsTable(slug: String, restaurants: any[] | String | null) {
  return Array.isArray(restaurants) ? (
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        backgroundColor: "#f5f5f5",
      }}
    >
      <thead>
        <tr>
          <td
            colSpan={2}
            style={{
              backgroundColor: "#333",
              color: "white",
              border: "1px solid #dddddd",
              padding: "8px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            List Name: {slug}
          </td>
        </tr>
        <tr>
          <th
            style={{
              backgroundColor: "#333",
              color: "white",
              border: "1px solid #dddddd",
              padding: "8px",
            }}
          >
            Restaurant Name
          </th>
          <th
            style={{
              backgroundColor: "#333",
              color: "white",
              border: "1px solid #dddddd",
              padding: "8px",
            }}
          >
            Added By
          </th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant, index) => (
          <tr key={index}>
            <td
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                color: "black",
                textAlign: "center",
              }}
            >
              {restaurant.restaurant}
            </td>
            <td
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                color: "black",
                textAlign: "center",
              }}
            >
              {restaurant.owner}
            </td>{" "}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        backgroundColor: "#f5f5f5",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              backgroundColor: "#333",
              color: "white",
              border: "1px solid #dddddd",
              padding: "8px",
            }}
          >
            Restaurant Name
          </th>
          <th
            style={{
              backgroundColor: "#333",
              color: "white",
              border: "1px solid #dddddd",
              padding: "8px",
            }}
          >
            Added By
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}
