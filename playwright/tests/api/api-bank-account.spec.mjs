import { expect, test } from "@playwright/test";
import { testData } from "../testdata.mjs";

const apiLogin = "/login";
const apiBankAccounts = "/bankaccounts";

test.describe("Bank account tests", () => {
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

  test("Get a list of accounts (GET /bankaccounts)", async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}${apiBankAccounts}`);
    expect(response.status()).toBe(200);
    expect((await response.json()).results.length).toBeGreaterThan(0);
  });

  test("Delete an account (DELETE /:bankAccountId)", async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}${apiBankAccounts}`);
    expect(response.status()).toBe(200);
    const bankAccountId = (await response.json()).results[0].id;

    const response_delete = await request.delete(`${baseURL}${apiBankAccounts}/${bankAccountId}`);
    expect(response_delete.status()).toBe(200);
  });
});
