interface TeamOver {
  score: {
    runs?: number;
    is_wicket?: boolean;
  };
}

export default function calculateStatsForRange(
  overs: TeamOver[],
  start: number,
  end: number
): { totalRuns: number; wicketsCount: number } {
  const selectedOvers = overs.slice(start, end);
  return calculateRunsAndWickets(selectedOvers);
}

function calculateRunsAndWickets(overs: TeamOver[]): {
  totalRuns: number;
  wicketsCount: number;
} {
  const flatArray: TeamOver[] = overs.flat();

  const totalRuns: number = flatArray.reduce(
    (sum, over) => sum + (over?.score?.runs || 0),
    0
  );

  const wicketsCount: number = flatArray.reduce(
    (count, over) => count + (over?.score?.is_wicket ? 1 : 0),
    0
  );

  return { totalRuns, wicketsCount };
}
