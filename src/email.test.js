import { test } from "node:test";
import assert from "node:assert/strict";
import {
  extractEmails,
  isValidEmail,
  getValidEmails,
  getUniqueValidEmails,
} from "./email.js";

test("extractEmails returns email fields from users", () => {
  const users = [{ email: "a@b.com" }, { email: "c@d.org" }];
  assert.deepEqual(extractEmails(users), ["a@b.com", "c@d.org"]);
});

test("extractEmails returns empty array for non-array input", () => {
  assert.deepEqual(extractEmails(null), []);
  assert.deepEqual(extractEmails("not-array"), []);
});

test("isValidEmail validates email format with RFC 5322 pattern", () => {
  assert.equal(isValidEmail("user@example.com"), true);
  assert.equal(isValidEmail("name+tag@company.co.uk"), true);
  assert.equal(isValidEmail("user@[192.168.0.1]"), true);
  assert.equal(isValidEmail("invalid-email"), false);
  assert.equal(isValidEmail("user@"), false);
  assert.equal(isValidEmail("user@.com"), false);
  assert.equal(isValidEmail(null), false);
});

test("isValidEmail enforces RFC 5321 length limits", () => {
  assert.equal(isValidEmail("a".repeat(65) + "@example.com"), false);
  assert.equal(isValidEmail("a".repeat(64) + "@example.com"), true);
  assert.equal(isValidEmail("a".repeat(250) + "@b.co"), false);
});

test("getValidEmails returns only valid emails", () => {
  const users = [
    { email: "valid@example.com" },
    { email: "bad-email" },
    { email: "also@valid.org" },
    { email: undefined },
  ];
  assert.deepEqual(getValidEmails(users), [
    "valid@example.com",
    "also@valid.org",
  ]);
});

test("getUniqueValidEmails removes duplicates case-insensitively", () => {
  const users = [
    { email: "User@Example.com" },
    { email: "user@example.com" },
    { email: "other@valid.org" },
    { email: "invalid" },
  ];
  assert.deepEqual(getUniqueValidEmails(users), [
    "User@Example.com",
    "other@valid.org",
  ]);
});
