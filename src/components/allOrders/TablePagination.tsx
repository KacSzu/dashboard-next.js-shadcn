import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PAGE_SIZE } from "@/utils/constants";

interface ITablePagination {
  count: number | null | undefined;
  currentPage: number;
  onChangePage: (newPage: number) => void;
}

export default function TablePagination({
  count,
  currentPage,
  onChangePage,
}: ITablePagination) {
  const numberOfPages = Math.ceil((count as number) / PAGE_SIZE);

  const getPaginationRange = () => {
    if (numberOfPages <= 3) {
      return [...Array(numberOfPages)].map((_, index) => index + 1);
    } else if (currentPage === 1) {
      return [1, 2, 3];
    } else if (currentPage === numberOfPages) {
      return [numberOfPages - 2, numberOfPages - 1, numberOfPages];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  const paginationRange = getPaginationRange();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onChangePage(currentPage - 1);
            }}
          />
        </PaginationItem>

        {currentPage > 2 && numberOfPages > 3 && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  onChangePage(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {paginationRange.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={(e) => {
                e.preventDefault();
                onChangePage(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < numberOfPages - 1 && numberOfPages > 3 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  onChangePage(numberOfPages);
                }}
              >
                {numberOfPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < numberOfPages) onChangePage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
