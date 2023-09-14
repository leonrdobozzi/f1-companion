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
  it("VALIDATE IF THE PAGE IS LOADED", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
  });

  it("VALIDATE IF THE API DATA IS LOADED", () => {
    cy.get("div#nextRace");
  });
});
