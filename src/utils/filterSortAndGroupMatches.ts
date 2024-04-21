// helper.js
export function filterSortAndGroupMatches(matches: any, upcoming: any) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to the start of today
  const todayDate = new Date(today.toISOString().split('T')[0]);
  let filteredMatches = matches;
  
  if (upcoming) {
    filteredMatches = matches.filter((match: any) => {
      const dateTime = new Date(match?.starting_at);
      const dateString = dateTime.toISOString().split('T')[0];
      const matchDate = new Date(dateString);
      return matchDate >= todayDate;
    });
  }else{
    filteredMatches = matches.filter((match: any) => {
      const dateTime = new Date(match?.starting_at);
      const dateString = dateTime.toISOString().split('T')[0];
      const matchDate = new Date(dateString);
      return matchDate <= todayDate;
  })}

  // Sort the filtered matches by ascending date
  filteredMatches
    .slice()
    .sort(
      (a: any, b: any) =>
        new Date(a.starting_at).getTime() - new Date(b.starting_at).getTime()
    );

  const groupedMatches: any[] = [];

  filteredMatches.forEach((match: any) => {
    const matchDate = match.starting_at.split(' ')[0];

    // Check if there is already a group for this date
    const existingGroup = groupedMatches.find(
      (group) => group.date === matchDate
    );

    if (existingGroup) {
      // If a group exists for this date, add the match to the matches array of that group
      existingGroup.matches.push(match);
    } else {
      // If no group exists for this date, create a new group
      groupedMatches.push({ date: matchDate, matches: [match] });
    }
  });

  return groupedMatches;
}
