describe("API REQUEST GET A VALID RESPONSE", () => {
  it("GET THE ALL RACES OF THE CURRENT YEAR", () => {
    cy.request("https://ergast.com/api/f1/current.json").as("allRacesRequest");
    cy.get("@allRacesRequest").then((races: any) => {
      expect(races.status).to.eq(200);
      assert.isObject(races.body, "All Races Response is an array!");
    });
  });

  it("GET THE RESULT OF THE LAST RACE", () => {
    cy.request("https://ergast.com/api/f1/current/last/results.json").as(
      "allRacesRequest",
    );
    cy.get("@allRacesRequest").then((last: any) => {
      expect(last.status).to.eq(200);
      assert.isObject(last.body, "All Races Response is an array!");
      assert.isArray(last.body.MRData.RaceTable.Races[0].Results);
    });
  });
});

describe("VALIDATE HOME PAGE", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("VALIDATE IF THE API DATA IS LOADED", () => {
    cy.get("div#nextRace")
      .invoke("val")
      .then((text) => {
        const someText = text as string;
        expect(someText).to.not.equal("Undefined");
      });
  });
});

describe("VALIDATE LOGIN AND SIGN UP PAGES", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("SEND LOGIN DATA", () => {
    cy.get("input[type=email]").type("teste@teste.com");
    cy.get("input[type=password]").type("teste");
    cy.get("button").contains("Login").click();
  });
});
