import { PAGE_SIZE } from "@/components/pagintaion-box";

export const paginate = <T>(
  page: number,
  list: Array<T>,
  size: number = PAGE_SIZE
) => {
  return list.slice((page - 1) * size, page * size) ?? [];
};
