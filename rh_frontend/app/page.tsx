import { cookies } from "next/headers";
import Messages from "./login/messages";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import rhlogo from "./rhlogo.png";

export default async function Login() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: session } = await supabase.auth.getSession();
  if (session?.session?.user) {
    redirect("/directory");
  }
  return (
    <div className="flex-1 flex flex-col w-full items-center px-8 sm:max-w-md justify-center gap-2">
      <h2 className="flex flex-col scroll-m-20 items-center text-center border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        <Image
          width="200"
          height="200"
          src={rhlogo}
          alt="Restaurant Hat Logo"
        ></Image>
        Welcome to Restaurant Hat!
      </h2>
      <h4 className="scroll-m-20 text-center text-l font-semibold tracking-tight">
        Please log in to start using Restaurant Hat
      </h4>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <label style={{ color: "white" }} className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label
          style={{ color: "white" }}
          className="text-md"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button
          style={{ color: "white" }}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
        >
          Sign In
        </button>
        <button
          formAction="/auth/sign-up"
          className="border border-foreground/20 bg-blue-500 rounded-md px-4 py-2 text-foreground mb-2"
        >
          Sign Up
        </button>
        <Messages />
      </form>
    </div>
  );
}
