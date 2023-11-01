test("Email is validated during sign up", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  //   await page.getByLabel("Email").fill("invalid.email");
  await page.getByTitle("email").fill("invalid.email");
  await page.getByTitle("password").fill("password");
  //   await page.getByLabel("Password").fill("password");
  await page.getByTitle("signUpButton").click();
  await expect(page.getByTitle("Error Message")).toMatchText(
    "Sign up failed: Please enter a valid email."
  );
});
