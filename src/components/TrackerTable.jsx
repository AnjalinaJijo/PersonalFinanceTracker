"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useMemo, useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
} from "@nextui-org/react";
import { PlusIcon } from "./Icons";
import { columns } from "./data.jsx";
import RenderCell from "./RenderCell";
import RenderEditing from "./RenderEditing.jsx";

import getExpense from "../lib/fetchFunctions/expense/getExpense";
import postExpense from "../lib/fetchFunctions/expense/postExpense";

//redux
import {
  selectFormattedCurrentDate,
  setTriggered,
  selectTriggered,
  setExpenseArray,
  selectExpenseArray,
  selectAddNew,
  setAddNew,
  setPopupVisible,
  selectPopupVisible,
} from "@/lib/features/expense/expenseSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

export default function TrackerTable() {
  //redux dispatch and selector functions
  const dispatch = useAppDispatch();
  // Get the current local date
  const formattedDate = useAppSelector(selectFormattedCurrentDate);
  const triggered = useAppSelector(selectTriggered);
  const getData = useAppSelector(selectExpenseArray);
  const addNew = useAppSelector(selectAddNew);
  const popupVisible = useAppSelector(selectPopupVisible);

  const newKey = uuidv4(); // Generate a unique key

  //for RenderEditing
  // const [isNewCategory, setIsNewCategory] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const getResponse = await getExpense();
        dispatch(setExpenseArray(getResponse));
      } catch (error) {
        console.error("Error fetching expenses:", error.message);
      }
    };

    fetchExpenses();
  }, [triggered]); // Empty dependency array ensures the effect runs only once,

  const rowsPerPage = 6;
  const [page, setPage] = useState(1);
  const pages = Math.ceil(getData.length / rowsPerPage);

  //content inside each page of table
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    // Include the editing row if it exists
    //editing row positioned at bottom if it is editing state
    const itemsWithEditing = addNew
      ? [...getData.slice(start, end), addNew]
      : getData.slice(start, end);
    return itemsWithEditing;
  }, [getData, page, addNew]);

  const handleAddNew = (e) => {
    e.preventDefault();
    dispatch(
      setAddNew({
        ExpenseID: newKey,
        Date: formattedDate,
        Activity: "",
        Category: "",
        Amount: 0,
        Description: "",
      })
    );
   
  };
  const SaveAddNew = async () => {
    if (addNew?.Activity === "" || addNew?.Category === "") {
      dispatch(setPopupVisible(true));
      return;
    }
    // Add logic to save the new row data to your data source
    const expense = await postExpense(addNew);
    //   // After saving, reset the editing state to null
    dispatch(setAddNew(null));
    dispatch(setTriggered(!triggered));
    dispatch(setPopupVisible(false));
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-end">
        <div>
          {addNew ? (
            <>
              <Button onClick={SaveAddNew} className="bg-MediumPurple3">
                Save
              </Button>
              <Button onClick={() => dispatch(setAddNew(null))} className="ml-2">
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={handleAddNew}
              className="bg-MediumPurple3"
              endContent={<PlusIcon />}
            >
              Add New
            </Button>
          )}
        </div>
      </div>
    );
  }, [addNew]);

  return (
    <>
      {popupVisible && (
        <div className="popup">
          <p>Please fill in all the required fields.</p>
          <Button onClick={() => dispatch(setPopupVisible(false))}>OK</Button>
        </div>
      )}

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
              initialPage={1}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={items} addNew={addNew}>
          {items.map((item) => (
            <TableRow key={item.ExpenseID}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {/* if editing is not null and expense id of edited item is same as expenseID of current item */}
                  {addNew && addNew.ExpenseID === item.ExpenseID ? (
                    <RenderEditing
                      columnKey={columnKey}
                    />
                  ) : (
                    <RenderCell expense={item} columnKey={columnKey} />
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
