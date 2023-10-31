import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";

export default async function LogOutButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex flex-col md:flex-row lg:flex-row absolute right-8 top-8 items-end md:items-center lg:items-center gap-2 text-sm md:text-base lg:text-large">
      <form action="/auth/sign-out" method="post">
        <Button
          variant="secondary"
          className="text-sm md:text-base lg:text-large"
        >
          Logout
        </Button>
      </form>
      Hey, {user.email}!
    </div>
  ) : null;
}
