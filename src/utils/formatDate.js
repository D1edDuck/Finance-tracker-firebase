export function formatDate(dateString) {
  console.log(dateString);
  const [, month, day] = dateString.split("-");
  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}`;
}
