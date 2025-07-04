import { test, expect, request } from "@playwright/test";

test.describe("Get posts", () => {
  test("should get list of posts", async () => {
    const context = await request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com/",
    });

    const response = await context.get("/posts");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    for (const post of body) {
      expect(post).toHaveProperty("userId");
      expect(typeof post.userId).toBe("number");

      expect(post).toHaveProperty("id");
      expect(typeof post.id).toBe("number");

      expect(post).toHaveProperty("title");
      expect(typeof post.title).toBe("string");

      expect(post).toHaveProperty("body");
      expect(typeof post.body).toBe("string");
    }
  });

  test("should get post by id", async ({}) => {
    const context = await request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com/",
    });

    const response = await context.get("/posts/1");
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty("userId", 1);
    expect(body).toHaveProperty("id", 1);
    expect(body).toHaveProperty(
      "title",
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
    );
    expect(body).toHaveProperty(
      "body",
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    );
  });
});
