const planet = require("../models/Planet");

describe("Tests d'ajout de nom de planète", function () {
  beforeEach(function () {
    planet.delete("Moon");
  });

  it("devrait ajouter une nouvelle planète avec succès", function () {
    const result = planet.save({
      name: "Moon",
      atmosphere: "Oxygen",
      type: "Terrestrial",
      size: 1,
    });
    expect(result).toBe(true);
  });

  it("ne devrait pas ajouter une planète avec le même nom", function () {
    planet.save({
      name: "Moon",
      atmosphere: "Oxygen",
      type: "Terrestrial",
      size: 1,
    });
    const result = planet.save({
      name: "Moon",
      atmosphere: "Gaz",
      type: "Terrestrial",
      size: 3,
    });
    expect(result).toBe(false);
  });
});

describe("Vérification des caractéristiques valides d'une planète", function () {
  it("ne devrait pas ajouter une planète avec une taille négative", function () {
    const result = planet.save({
      name: "Moon",
      atmosphere: "Oxygen",
      type: "Terrestrial",
      size: -1,
    });

    expect(result).toBe(false);
  });

  it("ne devrait pas ajouter une planète avec une atmosphère vide", function () {
    const result = planet.save({
      name: "Moon",
      atmosphere: "",
      type: "Terrestrial",
      size: 1,
    });
    expect(result).toBe(false);
  });

  it("ne devrait pas ajouter une planète avec un type vide", function () {
    const result = planet.save({
      name: "Moon",
      atmosphere: "Oxygen",
      type: "",
      size: 1,
    });
    expect(result).toBe(false);
  });

  it("ne devrait pas ajouter une planète avec une taille vide", function () {
    const result = planet.save({
      name: "Moon",
      atmosphere: "Oxygen",
      type: "Terrestrial",
      size: "",
    });
    expect(result).toBe(false);
  });

  it("ne devrait pas ajouter une planète avec une taille impossible", function () {
    const result = planet.save({
      name: "Moon",
      atmosphere: "Oxygen",
      type: "Terrestrial",
      size: 99999,
    });

    expect(result).toBe(false);
  });
});
