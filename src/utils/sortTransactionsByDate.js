export const sortTransactionsByDate = (transactions) => {
  console.log(transactions);
  return transactions.slice().sort((a, b) => {
    const [dayA, monthA] = a.data.split(".").map(Number);
    const [dayB, monthB] = b.data.split(".").map(Number);

    if (monthA !== monthB) {
      return monthB - monthA;
    }
    return dayB - dayA;
  });
};
