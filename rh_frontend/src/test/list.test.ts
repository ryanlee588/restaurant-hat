test("Should not be able to get a random restaurnt from a closed list", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await page.getByTitle("enter_list_name").fill("bia_hungry");
  await page.getByTitle("view_create_list_button").click();
  await new Promise((f) => setTimeout(f, 2000));
});
