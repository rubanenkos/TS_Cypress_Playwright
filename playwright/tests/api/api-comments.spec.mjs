import { expect, test } from "@playwright/test";
import { testData } from "../testdata.mjs";

const apiLogin = "/login";
const apiTransaction = "/transactions";
const apiComments = "/comments";

test.describe("Comments tests", () => {
  test.beforeEach(async ({ request, baseURL }) => {
    const newLogin = await request.post(`${baseURL}${apiLogin}`, {
      data: {
        type: "LOGIN",
        username: testData.username,
        password: testData.password,
      },
    });
    expect(newLogin.ok());
    expect(newLogin.status()).toBe(200);
  });

  test("Creates a new comment (POST /comments/:transactionId)", async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}${apiTransaction}`);
    expect(response.status()).toBe(200);
    const transactionId = (await response.json()).results[0].id;
    const response_post = await request.post(`${baseURL}${apiComments}/${transactionId}`, {
      data: { content: `Test comment by ${Date().toString()}` },
    });
    expect(response_post.status()).toBe(200);
    expect(response_post.statusText()).toBe("OK");
  });
});
