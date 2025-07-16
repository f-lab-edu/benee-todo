import React, { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const PAGE_SIZE = 5;

interface PaginationBoxProps {
  onPaginate: (page: number) => void;
  page?: number;
  size?: number;
  total: number;
}

const PaginationBox = ({
  onPaginate,
  page = 1,
  size = PAGE_SIZE,
  total,
}: PaginationBoxProps) => {
  const maxPage = total === 0 ? 1 : Math.ceil(total / size);

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPaginate(page - 1 <= 0 ? 1 : page - 1)}
            />
          </PaginationItem>
        )}
        {Array.from({ length: maxPage }, (_, i) => i + 1).map((item) => (
          <PaginationItem
            key={`pagination-${item}`}
            onClick={() => onPaginate(item)}
          >
            <PaginationLink isActive={item === page}>{item}</PaginationLink>
          </PaginationItem>
        ))}
        {page !== maxPage && (
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                onPaginate(page + 1 >= maxPage ? maxPage : page + 1)
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBox;
