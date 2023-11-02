test("Owner should be able to get a random restaurant", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await page.goto("https://restaurant-hat.vercel.app/list/bia_hungry");
  await page.getByTitle("get_random_restaurant_button").click();
  await new Promise((f) => setTimeout(f, 1000));
  await expect(page).toMatchText(
    'div[role="alertdialog"][id^="radix-"][aria-describedby^="radix-"][aria-labelledby^="radix-"][data-state="open"].border.bg-gray-900',
    /Random Restaurant Pick(?!.*No restaurants in list! Add Restaurant to get a random restaurant\.).*Continue/
  );
});

test("Non Owner should not be able to get a random restaurant", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test1@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await page.goto("https://restaurant-hat.vercel.app/list/bia_hungry");
  await page.getByTitle("get_random_restaurant_button").click();
  await new Promise((f) => setTimeout(f, 3000));
  await expect(page).toMatchText(
    'div[role="alertdialog"][id^="radix-"][aria-describedby^="radix-"][aria-labelledby^="radix-"][data-state="open"].border.bg-gray-900',
    "Random Restaurant PickFailed to get random restaurant: Only the first user to add a restaurant can get a random restaurant!Continue"
  );
});

test("Should not be able to add restaurant to a closed list", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await page.goto("https://restaurant-hat.vercel.app/list/bia_hungry");
  await page.getByTitle("restaurant_to_insert").fill("random");
  await page.getByTitle("restaurant_insert_button").click();
  await new Promise((f) => setTimeout(f, 1000));
  await expect(page).toMatchText(
    'li[role="status"][aria-live="off"][aria-atomic="true"][tabindex="0"][data-state="open"][data-swipe-direction="right"].border.bg-background.text-foreground',
    "Failed to add restaurant to listList is closed! Unable to add anymore restaurants."
  );
});

test("Should be able to add restaurant to an open list", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await page.goto("https://restaurant-hat.vercel.app/list/open_list_test");
  await page.getByTitle("restaurant_to_insert").fill("random");
  await page.getByTitle("restaurant_insert_button").click();
  await new Promise((f) => setTimeout(f, 1000));
  await expect(page).toMatchText(
    'li[role="status"][aria-live="off"][aria-atomic="true"][tabindex="0"][data-state="open"][data-swipe-direction="right"].border.bg-background.text-foreground',
    "Successfully added restaurant to listAdded random to list"
  );
});

test("Non owner Should be able to add restaurant to an open list", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await page.getByTitle("email").fill("test1@test.com");
  await page.getByTitle("password").fill("password1");
  await page.getByTitle("signInButton").click();
  await page.goto("https://restaurant-hat.vercel.app/list/open_list_test");
  await page.getByTitle("restaurant_to_insert").fill("random");
  await page.getByTitle("restaurant_insert_button").click();
  await new Promise((f) => setTimeout(f, 1000));
  await expect(page).toMatchText(
    'li[role="status"][aria-live="off"][aria-atomic="true"][tabindex="0"][data-state="open"][data-swipe-direction="right"].border.bg-background.text-foreground',
    "Successfully added restaurant to listAdded random to list"
  );
});
