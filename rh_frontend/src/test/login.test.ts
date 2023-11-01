test("Email is validated during sign up", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByLabel("Email").fill("invalid.email");
  //   await page.getByTitle("Email").fill("invalid.email");
  //   await page.getByTitle("Password").fill("password");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign Up Button" }).click();
  await expect(page.getByTitle("Error Message")).toMatchText(
    "Sign up failed: Please enter a valid email."
  );
});
