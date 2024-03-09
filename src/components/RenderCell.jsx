'use client'
import React, {useState} from "react";
import { Tooltip } from "@nextui-org/react";

import {EditIcon} from "./Icons";
import {DeleteIcon} from "./Icons";
import {SaveIcon} from "./Icons";

import {Input, Button} from "@nextui-org/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

export const RenderCell =(expense, columnKey, DeleteExpense, handleUpdate,currentID, setCurrentID,editedValue,setEditedValue) => {

  console.log('expense',expense)

   // Get the current local date
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, "0");
   const day = String(currentDate.getDate()).padStart(2, "0");
   const formattedDate = `${year}-${month}-${day}`;



  const startEditing = () => {
    setCurrentID(expense.ExpenseID);
    setEditedValue(expense);
  };

  const cancelEditing = () => {
    setCurrentID(null);
    setEditedValue(expense);
  };

  const saveEditing = () => {
    setCurrentID(null);
    // Perform PUT request or update logic here
    handleUpdate(expense.ExpenseID, columnKey);
  };



  // if (!expense) {
  //   // Handle the case where expense is undefined
  //   return <div>Error: Expense data is missing</div>;
  // }

    const cellValue = expense[columnKey];

  const options={
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }

    switch (columnKey) {
      case "Date":
        return (
          <>
          {currentID===expense.ExpenseID ?( <div><DatePicker
            selected={new Date(cellValue)}
            onChange={(date) =>
              setEditedValue({
                ...editedValue,
                [columnKey]: new Date(date),
              })
            }
            className="w-full"
            popperPlacement="auto"
            popperModifiers={{
             preventOverflow: {
               enabled: true,
               boundariesElement: "viewport", // Ensure it stays within the viewport
             },
           }}
          /></div>):
            (<div>{new Date(cellValue).toLocaleDateString("en-us",options)}</div>)
            }
            </>
        );
      case "Activity":
        return (
          (currentID===expense.ExpenseID) ? (
            <Input
              size='xs'
              type="text"
              value={editedValue[columnKey]}
              onChange={(e) => setEditedValue({ ...editedValue, [columnKey]: e.target.value })}
            />
          ) : (
            <div>{expense[columnKey]}</div>
          )
        );
      case "Category":
        return (
          currentID===expense.ExpenseID ? (
            <Input
              size='xs'
              type="text"
              value={editedValue[columnKey]}
              onChange={(e) => setEditedValue({ ...editedValue, [columnKey]: e.target.value })}
            />
          ) : (
            <div>{expense[columnKey]}</div>
          )
        );
      case "Amount":
        return (
          currentID===expense.ExpenseID ? (
            <Input
              size='xs'
              type="text"
              value={editedValue[columnKey]}
              onChange={(e) => setEditedValue({ ...editedValue, [columnKey]: e.target.value })}
            />
          ) : (
            <div>{expense[columnKey]}</div>
          )
        );
      case "Description":
        return (
          currentID===expense.ExpenseID ? (
            <Input
              size='xs'
              type="text"
              value={editedValue[columnKey]}
              onChange={(e) => setEditedValue({ ...editedValue, [columnKey]: e.target.value })}
            />
          ) : (
            <div>{expense[columnKey]}</div>
          )
        );
      case "Actions":
        return (
          <div className="relative flex items-center gap-2">
          {currentID===expense.ExpenseID ? (
           <>

<Tooltip color="green" content="Save changes">
              <span onClick={saveEditing} className="text-lg text-green-600 cursor-pointer active:opacity-50">
                <SaveIcon />
              </span>
            </Tooltip>

              <Tooltip color="danger" content="Cancel editing">
                <span
                  onClick={cancelEditing}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </>
          ) : (
            <>
              {/* <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip> */}
              <Tooltip content="Edit user">
                <span
                  onClick={startEditing}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span
                  onClick={(e) => DeleteExpense(e, expense.ExpenseID)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </>
          )}
        </div>
        );
      // default:
      //   return {cellValue};
    }
  
  };
