export default function getCapitalizeEachWord(str: string) {
  if (!str || typeof str !== "string") {
    return "";
  }

  return str.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}
