describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "testuser",
      name: "Test User",
      password: "sekret",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("form").find("button").contains("Log in");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get('input[name="username"]').type("testuser");
      cy.get('input[name="password"]').type("sekret");
      cy.contains("Log in").click();
      cy.contains("blogs");
      cy.contains("Test User logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get('input[name="username"]').type("testuser");
      cy.get('input[name="password"]').type("wrong");
      cy.contains("Log in").click();
      cy.contains("password is incorrect").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "testuser",
        password: "sekret",
      }).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("form").find('input[name="title"]').type("Test Blog");
      cy.get("form").find('input[name="author"]').type("Nobody");
      cy.get("form").find('input[name="url"]').type("http://www.example.com");
      cy.get("form").find("button").click();

      cy.contains("Test Blog Nobody");
    });
  });
});
