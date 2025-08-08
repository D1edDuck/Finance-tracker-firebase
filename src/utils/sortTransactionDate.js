export function sortTransactionDate(transaction, sortName) {
  const transactionDate = transaction.slice("").sort((a, b) => {
    const [yearA, monthA, dayA] = a.date.split("-").map(Number);
    const [yearB, monthB, dayB] = b.date.split("-").map(Number);

    if (yearA != yearB) return yearB - yearA;
    if (monthA != monthB) return monthB - monthA;
    return dayB - dayA;
  });
  const transactionSort = transactionDate.filter((category) => {
    if (sortName == "") return category;
    if (category.name == sortName) return category;
    if (sortName == "expenses" && category.type == "expenses") return category;
    if (sortName == "income" && category.type == "income") return category;
  });

  return transactionSort;
}
