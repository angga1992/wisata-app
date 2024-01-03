"use client"

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useEffect, useState } from "react"
import { Button } from "./button"
import { Pagination, Pagination2 } from "./paginations"

export interface PaginationInterface {
  total : number,
  per_page : number,
  current_page : number,
  last_page : number,
  from : number,
  to : number
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination? : PaginationInterface
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination
}: DataTableProps<TData, TValue>) {

  const [rowSelection, setRowSelection] = React.useState({})

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const paginate: PaginationInterface = {
    total : 100,
    per_page : 10,
    current_page : 1,
    last_page : 10,
    from : 1,
    to : 10
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
  })

  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    // Get the current path on mount
    setCurrentPath(window.location.pathname);
  }, []); 


  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="text-xs">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* pagination */}
      { currentPath.includes('/assets/list/tanah-bangunan') || currentPath.includes('/assets/detail') ? (
        <Pagination table={table} />
        ) : (
          <span></span>
        )
      }
      {/* {
        paginate && <Pagination2 {...paginate} />
      } */}
    </div>
  )
}
