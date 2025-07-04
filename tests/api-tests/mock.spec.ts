import { test, expect, request } from "@playwright/test";

test("Mock GET /users and verify response", async ({ page }) => {
  await page.route(
    "https://jsonplaceholder.typicode.com/users",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          { id: 1, name: "Mocked User 1" },
          { id: 2, name: "Mocked User 2" },
        ]),
      });
    }
  );

  await page.goto("data:text/html, <html></html>");

  const users = await page.evaluate(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
  });

  console.log(users);
  expect(users).toEqual([
    { id: 1, name: "Mocked User 1" },
    { id: 2, name: "Mocked User 2" },
  ]);
});
