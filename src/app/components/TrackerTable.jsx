'use client'

import React from "react";
import { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import {PlusIcon} from "./Icons";
import {columns, expenses} from "./data";
import {RenderCell} from "./RenderCell";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};


export default function TrackerTable() {

  const rowsPerPage = 5
  const [page, setPage] = useState(1)
  const pages = Math.ceil(expenses.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return expenses.slice(start, end)
  }, [page])


  const topContent= useMemo(()=>{
    return(
    <div className="flex justify-end">
      <div>
            <Button className="bg-MediumPurple3" endContent={<PlusIcon />}>
              Add New
            </Button>
            </div>
    </div>
    )
  },[])

  return (
  <Table 
    isStriped
    aria-label="Table to track expenses"
    topContent={topContent}
    topContentPlacement="outside"
    bottomContentPlacement="outside"
    bottomContent={
      <div className="flex w-full justify-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="secondary"
        page={page}
        total={pages}
        onChange={(page) => setPage(page)}
      />
    </div>
    }
    classNames={{
      wrapper: "min-h-[222px]",
    }} 
    >
      <TableHeader columns={columns} >
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items} >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{RenderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
