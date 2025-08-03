export const transformFilterTransaction = (filterTransaction) => {
  return filterTransaction.flatMap((item) => {
    return item.story.map((story) => ({
      id: story.id,
      data: story.data,
      sum: story.sum,
      img: item.img,
      name: item.name,
      category: item.category,
      idCategory: item.id,
    }));
  });
};
