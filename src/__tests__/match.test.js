import {
  calculateRatingAdjustment,
  calculateELO,
} from "../services/match-service.js"; // Replace with actual module name

describe("calculateRatingAdjustment", () => {
  it("should return the correct rating adjustment (k) based on hours played", () => {
    expect(calculateRatingAdjustment({ hours: 100 })).toBe(50);
    expect(calculateRatingAdjustment({ hours: 600 })).toBe(40);
    expect(calculateRatingAdjustment({ hours: 1500 })).toBe(30);
    expect(calculateRatingAdjustment({ hours: 3500 })).toBe(20);
    expect(calculateRatingAdjustment({ hours: 6000 })).toBe(10);
  });
});

describe("calculateELO", () => {
  it("should calculate ELO correctly for a win", () => {
    const result = calculateELO("win", 1500, 1400, 50);
    expect(result).toBeGreaterThan(1500); // The player's ELO should increase after a win
  });

  it("should calculate ELO correctly for a loss", () => {
    const result = calculateELO("loss", 1500, 1600, 50);
    expect(result).toBeLessThan(1500); // The player's ELO should decrease after a loss
  });

  it("should calculate ELO correctly for a tie", () => {
    const result = calculateELO("tie", 1500, 1500, 50);
    expect(result).toBeCloseTo(1500); // The player's ELO should remain the same in a tie
  });
});
