export default function getCricketTeamScore(matchData: any) {
  let localTeamScore;
  let visitorTeamScore;

  localTeamScore = matchData?.scoreboards?.filter((team: any) => team.team_id === matchData?.localteam?.id);
  localTeamScore = localTeamScore[localTeamScore?.length - 1];

  visitorTeamScore = matchData?.scoreboards?.filter((team: any) => team.team_id === matchData?.visitorteam?.id);
  visitorTeamScore = visitorTeamScore[visitorTeamScore?.length - 1];

  const teamScore = { localTeamScore, visitorTeamScore };

  return teamScore;
}
