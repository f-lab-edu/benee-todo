export const paginate = <T>(
  page: number,
  size: number = 10,
  list: Array<T>
) => {
  return list.slice((page - 1) * size, page * size) ?? [];
};
