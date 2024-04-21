interface Match {
  id: number;
  participants: {
    id: number;
    name: string;
    meta: {
      winner: boolean;
      location: string;
    };
  }[];
  scores: {
    description: string;
    score: {
      goals: number;
      participant: string;
    };
  }[];
}

interface Prediction {
  homeWinsProbability: number;
  awayWinsProbability: number;
  drawsProbability: number;
}

function calculateWinsAndDraws(
  matches: Match[],
  homeTeamId: number,
  awayTeamId: number
): { homeWins: number; awayWins: number; draws: number } {
  let homeWins = 0;
  let awayWins = 0;
  let draws = 0;

  for (const match of matches) {
    const homeScore = match.scores.find(
      (score) => score.score.participant === "home" && score.description === "CURRENT"
    );

    const awayScore = match.scores.find(
      (score) => score.score.participant === "away" && score.description === "CURRENT"
    );

    if (homeScore && awayScore) {
      if (homeTeamId && awayTeamId) {
        if (homeScore.score.goals > awayScore.score.goals) {
          homeWins++;
        } else if (homeScore.score.goals < awayScore.score.goals) {
          awayWins++;
        } else {
          draws++;
        }
      }
    }
  }

  return { homeWins, awayWins, draws };
}

export default function predictOutcome(matches: Match[], homeTeamId: number, awayTeamId: number): Prediction {
  const { homeWins, awayWins, draws } = calculateWinsAndDraws(matches, homeTeamId, awayTeamId);
  const totalMatches = homeWins + awayWins + draws;
  const homeWinsProbability = (homeWins / totalMatches) * 100;
  const awayWinsProbability = (awayWins / totalMatches) * 100;
  const drawsProbability = (draws / totalMatches) * 100;

  return { homeWinsProbability, awayWinsProbability, drawsProbability };
}
