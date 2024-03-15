'use client'
import React, {useState} from "react";
import {  Dropdown,
  Tooltip,
  DropdownTrigger,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  Input,
 } from "@nextui-org/react";

import {EditIcon} from "./Icons";
import {DeleteIcon} from "./Icons";
import {SaveIcon, Plus} from "./Icons";

//redux
import {setEditedValue, 
  selectEditedValue,
   selectFormattedCurrentDate,
    setTriggered, selectTriggered,setEditItemID,selectEditItemID,
  setCategoryItems,
  selectCategoryItems,
} from "@/lib/features/expense/expenseSlice";
import {useAppSelector, useAppDispatch } from "@/lib/hooks"

import deleteExpense from "@/lib/fetchFunctions/expense/deleteExpense";
import updateExpense from "@/lib/fetchFunctions/expense/updateExpense";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

const RenderCell =({expense, columnKey}) => {

  const dispatch = useAppDispatch();
  const editedValue = useAppSelector(selectEditedValue)
  const triggered = useAppSelector(selectTriggered)
  const editItemID = useAppSelector(selectEditItemID)
  const categoryItems = useAppSelector(selectCategoryItems);
  


  const startEditing = () => {
    dispatch(setEditItemID(expense.ExpenseID))
    dispatch(setEditedValue(expense))
  };

  const cancelEditing = () => {
    dispatch(setEditItemID(null))
    dispatch(setEditedValue(expense))
  };

  const saveEditing = async() => {
    // Perform PUT request or update logic here
    // handleUpdate(expense.ExpenseID, columnKey);
    try {
      // Perform PUT request with the updated expense data
      const response  = await updateExpense(editItemID,editedValue)
    } catch (error) {
      console.error("Error updating expense:", error.message);
    }
    dispatch(setEditItemID(null))
    dispatch(setTriggered(!triggered));
  };

  const cellValue = expense[columnKey];
  console.log("cellValue",cellValue)
  console.log("expense[columnKey]",expense[columnKey])

  const options={
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }

  const handleAction = (key) => {
      dispatch(setEditedValue({ ...editedValue, [columnKey]: key }));
  };


  const DeleteExpense = async (expenseID)=>{
    const response = await deleteExpense(expenseID)
    dispatch(setTriggered(!triggered));

  }

    switch (columnKey) {
      case "Date":
        return (
          <>
          {editItemID===expense.ExpenseID ?(
             <div><DatePicker
            selected={new Date(editedValue[columnKey])}
            onChange={(date) =>
              dispatch(setEditedValue({
                ...editedValue,
                [columnKey]: new Date(date),
              }))
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
          (editItemID===expense.ExpenseID) ? (
            <Input
              size='xs'
              type="text"
              value={editedValue[columnKey]}
              onChange={(e) =>
                dispatch(setEditedValue({
                  ...editedValue,
                  [columnKey]: e.target.value
                }))
              }
            />
          ) : (
            <div>{expense[columnKey]}</div>
          )
        );
      case "Category":
        return (
          (editItemID===expense.ExpenseID) ? (
            <Dropdown showArrow radius="sm">
            <DropdownTrigger>
              <Button variant="bordered">{editedValue[columnKey]}</Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Categories"
              items={categoryItems}
              onAction={(key) => handleAction(key)}
            >
              {categoryItems.map((item) => (
                <DropdownItem
                  key={item.key}
                  // onClick={() => handleAction(item.key)}
                >
                  {item.category}
                </DropdownItem>
              ))}

              <DropdownSection>
                <DropdownItem
                  key="new_project"
                  endContent={<Plus className="text-large" />}
                >
                  New Project
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
            // <Input
            //   size='xs'
            //   type="text"
            //   value={editedValue[columnKey]}
            //   onChange={(e) => setEditedValue({ ...editedValue, [columnKey]: e.target.value })}
            // />
          ) : (
            <div>{expense[columnKey]}</div>
          )
        );
      case "Amount":
        return (
          editItemID===expense.ExpenseID ? (
            <Input
              size='xs'
              type="text"
              value={editedValue[columnKey]}
              onChange={(e) =>
                dispatch(setEditedValue({
                  ...editedValue,
                  [columnKey]: e.target.value
                }))
              }
            />
          ) : (
            <div>{expense[columnKey]}</div>
          )
        );
      case "Description":
        return (
          editItemID===expense.ExpenseID ? (
            <Input
              size='xs'
              type="text"
              value={editedValue[columnKey]}
              onChange={(e) =>
                dispatch(setEditedValue({
                  ...editedValue,
                  [columnKey]: e.target.value
                }))
              }
            />
          ) : (
            <div>{expense[columnKey]}</div>
          )
        );
      case "Actions":
        return (
          <div className="relative flex items-center gap-2">
          {editItemID===expense.ExpenseID ? (
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
                  onClick={() => DeleteExpense(expense.ExpenseID)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </>
          )}
        </div>
        );
    }
  
  };


  export default RenderCell