import { test, expect, request } from "@playwright/test";

test("should create a new post", async () => {
  const context = await request.newContext({
    baseURL: "https://jsonplaceholder.typicode.com/",
  });

  const requestBody = {
    userId: 12,
    title: "new post creation",
    body: "Example of a new post added via a test request",
  };

  const response = await context.post("/posts", {
    data: requestBody,
  });

  const body = await response.json();

  expect(response.status()).toBe(201);
  expect(body).toHaveProperty("userId", 12);
  expect(body).toHaveProperty("title", "new post creation");
  expect(body).toHaveProperty("body", "Example of a new post added via a test request");
  expect(body).toHaveProperty("id");
});
