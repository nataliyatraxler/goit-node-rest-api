test("повертає 200 і токен", async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "test@example.com", password: "12345678" });

  expect(res.statusCode).toBe(200);
  expect(res.body.token).toBeDefined();
  expect(typeof res.body.user.email).toBe("string");
  expect(typeof res.body.user.subscription).toBe("string");
});
