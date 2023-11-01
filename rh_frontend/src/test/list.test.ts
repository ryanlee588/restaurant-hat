test("Owner should be able to get a random restaurnt", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await page.getByTitle("enter_list_name").fill("bia_hungry");
  await page.getByTitle("view_create_list_button").click();
  await new Promise((f) => setTimeout(f, 3000));
  await page.getByTitle("get_random_restaurant_button").click();
  await new Promise((f) => setTimeout(f, 1000));
  await expect(page).toMatchText(
    'div[role="alertdialog"][id^="radix-"][aria-describedby^="radix-"][aria-labelledby^="radix-"][data-state="open"].border.bg-gray-900',
    /Random Restaurant Pick(?!.*No restaurants in list! Add Restaurant to get a random restaurant\.).*Continue/
  );
});

test("Non Owner should be able to get a random restaurnt", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test1@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await page.getByTitle("enter_list_name").fill("bia_hungry");
  await page.getByTitle("view_create_list_button").click();
  await new Promise((f) => setTimeout(f, 3000));
  await page.getByTitle("get_random_restaurant_button").click();
  await new Promise((f) => setTimeout(f, 1000));
  await expect(page).toMatchText(
    'div[role="alertdialog"][id^="radix-"][aria-describedby^="radix-"][aria-labelledby^="radix-"][data-state="open"].border.bg-gray-900',
    "Random Restaurant PickFailed to get random restaurant: Only the first user to add a restaurant can get a random restaurant!Continue"
  );
});

test("To close list in case previous test fails", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test1@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await page.getByTitle("enter_list_name").fill("to_delete_456");
  await page.getByTitle("delete_list_button").click();
  await new Promise((f) => setTimeout(f, 3000));
});
