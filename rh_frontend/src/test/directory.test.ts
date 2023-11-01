test("Viewing existing list should be redirected to list page", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await page.getByTitle("enter_list_name").fill("bia_hungry");
  await page.getByTitle("view_create_list_button").click();
  await new Promise((f) => setTimeout(f, 2000));
  await expect(page.url()).toMatch(
    "https://restaurant-hat.vercel.app/list/bia_hungry"
  );
});

test("Owner should be able to delete list", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await page.getByTitle("enter_list_name").fill("to_delete_123");
  await page.getByTitle("view_create_list_button").click();
  await new Promise((f) => setTimeout(f, 2000));
  await page.goto("https://restaurant-hat.vercel.app/directory");
  await page.getByTitle("enter_list_name").fill("to_delete_123");
  await page.getByTitle("delete_list_button").click();
  await expect(page).toMatchText(
    'li[role="status"][aria-live="off"][aria-atomic="true"][tabindex="0"][data-state="open"][data-swipe-direction="right"].border.bg-background.text-foreground',
    "Successfully deleted list to_delete_123!"
  );
});
