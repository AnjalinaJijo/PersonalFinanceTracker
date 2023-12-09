'use client'

import React from "react";
import { useCallback, useMemo, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button, Pagination} from "@nextui-org/react";
import {EditIcon} from "./Icons";
import {DeleteIcon} from "./Icons";
import {EyeIcon} from "./Icons";
import {columns, expenses} from "./data";

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

  const renderCell = React.useCallback((expense, columnKey) => {
    const cellValue = expense[columnKey];


  const options={
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }

    switch (columnKey) {
      case "date":
        return (
         <div>{new Date(cellValue).toLocaleDateString("en-us",options)}</div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "activity":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "category":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "amount":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "description":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
  <Table 
    isStriped
    aria-label="Table to track expenses"
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
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
