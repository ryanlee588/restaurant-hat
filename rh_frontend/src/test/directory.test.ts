test("Should be redirected to list page", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await page.getByTitle("enter_list_name").fill("bia_hungry");
  await page.getByRole("button", { name: "view_create_list_button" }).click();
  //   await page.getByTitle("view_create_list_button").click();
  await page.screenshot({ path: "screenshot.png", fullPage: true });
  await expect(page.url()).toMatch(
    "https://restaurant-hat.vercel.app/list/bia_hungry"
  );
});
