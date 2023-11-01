test("Email is validated during sign up", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("invalid.email");
  await page.getByTitle("password").fill("password");
  await page.getByTitle("signUpButton").click();
  await expect(page.getByTitle("Error Message")).toMatchText(
    "Sign up failed: Please enter a valid email."
  );
});

test("Sign in ensures user is signed up", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("fake@fake123.com");
  await page.getByTitle("password").fill("password");
  await page.getByTitle("signInButton").click();
  await expect(page.getByTitle("Error Message")).toMatchText(
    "Sign in failed: Check that your email and password are valid"
  );
});

test("Sign in ensures password is correct", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test@test.com");
  await page.getByTitle("password").fill("password");
  await page.getByTitle("signInButton").click();
  await expect(page.getByTitle("Error Message")).toMatchText(
    "Sign in failed: Check that your email and password are valid"
  );
});

test("Sign in and redirect works for registered user", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await expect(page.url()).toMatch(
    "https://restaurant-hat.vercel.app/directory"
  );
});
