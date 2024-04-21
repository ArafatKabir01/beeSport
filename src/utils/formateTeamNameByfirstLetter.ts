export default function formateTeamNameByfirstLetter(input: string): string {
  // Split the input string into words
  const words: string[] = input.split(' ');

  // Extract the first letter from each word and convert it to uppercase
  const abbreviation: string = words
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  return abbreviation;
}
