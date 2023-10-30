import { cookies } from "next/headers";
import Messages from "./login/messages";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export default async function Login() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: session } = await supabase.auth.getSession();
  if (session?.session?.user) {
    redirect("/directory");
  }
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <div>Please Log In to access Restaurant Hat.</div>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Sign In
        </button>
        <button
          formAction="/auth/sign-up"
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        >
          Sign Up
        </button>
        <Messages />
      </form>
    </div>
  );
}
