import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";

export default async function LogOutButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex flex-row absolute right-8 top-8 items-center gap-2 text-xs md:text-sm lg:text-md">
      Hey, {user.email}!
      <form action="/auth/sign-out" method="post">
        <Button
          variant="secondary"
          className="text-sm md:text-base lg:text-large"
        >
          Logout
        </Button>
      </form>
    </div>
  ) : null;
}
