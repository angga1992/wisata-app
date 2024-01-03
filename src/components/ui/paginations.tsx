
import { MdLastPage, MdFirstPage, MdChevronRight, MdChevronLeft  } from "react-icons/md"
  import { Table } from "@tanstack/react-table"
  import { Button } from "./button"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./select"
import { PaginationInterface } from "./data-table"
import { PropsWithChildren, memo } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter } from "next/router"
import usePagination from "../costume/paginations-core"


  interface DataTablePaginationProps<TData> {
    table: Table<TData>
  }
  
export function Pagination<TData>({
    table,
  }: DataTablePaginationProps<TData>) {
    return (
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-xs text-muted-foreground">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected. */}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-xs font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-xs font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <MdFirstPage className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <MdChevronLeft className="h5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <MdChevronRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <MdLastPage className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    )
}


export const Pagination2 = ({ 
  total = 120,
  per_page = 10,
  current_page = 1,
  last_page,
  from,
  to
 }: PaginationInterface) => {
    // use the usePagination hook
    // currentPage - current page
    // getPageItem - function that returns the type of page based on the index.
    // size - the number of pages
    const { currentPage, getPageItem, totalPages } = usePagination({
      totalItems: total,
      page: current_page,
      itemsPerPage: per_page,
      maxPageItems: 7,
    });
  
    const firstPage = 1;
    // calculate the next page
    const nextPage = Math.min(current_page + 1, totalPages);
    // calculate the previous page
    const prevPage = Math.max(current_page - 1, firstPage);
    // create a new array based on the total pages
    const arr = new Array(totalPages);
  
    return (
      <div className="flex gap-2 items-center">
        {[...arr].map((_, i) => {
          // getPageItem function returns the type of page based on the index.
          // it also automatically calculates if the page is disabled.
          const { page, disabled } = getPageItem(i);
  
          if (page === "previous") {
            return (
              <PaginationLink page={prevPage} disabled={disabled} key={page}>
                {`<`}
              </PaginationLink>
            );
          }
  
          if (page === "gap") {
            return <span key={`${page}-${i}`}>...</span>;
          }
  
          if (page === "next") {
            return (
              <PaginationLink page={nextPage} disabled={disabled} key={page}>
                {`>`}
              </PaginationLink>
            );
          }
  
          return (
            <PaginationLink active={page === currentPage} key={page} page={page!}>
              {page}
            </PaginationLink>
          );
        })}
      </div>
    );
  };
  
  type PaginationLinkProps = {
    page?: number | string;
    active?: boolean;
    disabled?: boolean;
  } & PropsWithChildren;
  
function PaginationLink({ page, children, ...props }: PaginationLinkProps) {
    // const router = useRouter();
    // const query = router.query;
  
    // we use existing data from router query, we just modify the page.
    const q = { page };
    return (
      <Link
        // only use the query for the url, it will only modify the query, won't modify the route.
        href={{ query: q }}
        // toggle the appropriate classes based on active, disabled states.
        className={cn({
          "p-2": true,
          "font-bold text-indigo-700": props.active,
          "text-indigo-400": !props.active,
          "pointer-events-none text-gray-200": props.disabled,
        })}
      >
        {children}
      </Link>
    );
  }
  export default memo(Pagination);
  