export default function simulateMatchOutcome(): { [outcome: string]: number } {
  const team1WinPercentage = Math.floor(Math.random() * 100); // Random percentage for Team 1 win
  const team2WinPercentage = Math.floor(Math.random() * (100 - team1WinPercentage)); // Random percentage for Team 2 win
  const drawPercentage = 100 - team1WinPercentage - team2WinPercentage; // Remaining percentage for draw

  return {
    teamOne: team1WinPercentage,
    teamTwo: team2WinPercentage,
    draw: drawPercentage
  };
}
