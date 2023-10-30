import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";

export default async function LogOutButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex flex-row absolute right-8 top-8 items-center gap-4">
      Hey, {user.email}!
      <form action="/auth/sign-out" method="post">
        <Button
          variant="secondary"
          className="text-sm md:text-base lg:text-large"
          // className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          Logout
        </Button>
      </form>
    </div>
  ) : null;
}
