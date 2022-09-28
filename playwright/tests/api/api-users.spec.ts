import { expect, test } from "@playwright/test";
import { testData } from "../testdata";

const apiLogin = "/login";
const apiUsers = "/users";
const apiProfile = "/profile";

test.describe("Users tests", () => {
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

  test("Get list of users (GET /users)", async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}${apiUsers}`);
    expect(response.status()).toBe(200);
    expect((await response.json()).results.length).toBeGreaterThan(1);
  });

  test("Get a user profile by username (GET /users/profile/:username)", async ({
    request,
    baseURL,
  }) => {
    const response = await request.get(`${baseURL}${apiUsers}/${apiProfile}/${testData.username}`);
    expect(response.status()).toBe(200);
    const response_body = await response.json();
    expect(response_body.user.firstName).toBe("Edgar");
    expect(response_body.user.lastName).toBe("Johns");
    expect(response_body.user.avatar).not.toBe("");
  });
});
