describe("Appointments", () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit("http://localhost:8001/api/debug/reset")
  })

  it("should book an interview", () => {
    cy.visit("/");
    cy.contains("Monday");
    cy.get("") 
  });
});
