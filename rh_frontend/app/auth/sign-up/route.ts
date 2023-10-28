import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = createClient();

  if (validateEmail(email)) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=Sign up failed: Email already in use, pick another email to continue.`,
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
      );
    }

    return NextResponse.redirect(
      `${requestUrl.origin}/login?message=Sign up success: Sign in to continue.`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  } else {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Sign up failed: Please enter a valid email. `,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }
}

function validateEmail(email: string) {
  // Regular expression pattern for a basic email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Test the email against the pattern
  return emailPattern.test(email);
}
