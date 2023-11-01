test("Page is reachable", async () => {
  await page.goto("https://restaurant-hat.vercel.app");
  await expect(page).toMatchText(
    "h3.scroll-m-20.text-2xl.font-semibold.text-center.tracking-tight",
    "If you and your friends can't pick where to eat , try this"
  );
});
