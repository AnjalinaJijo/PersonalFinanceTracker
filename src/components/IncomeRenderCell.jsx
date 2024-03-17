// IncomeID, Date, Name, Amount, Description
"use client";
import React, { useState } from "react";
import { Tooltip } from "@nextui-org/react";

import { EditIcon } from "./Icons";
import { DeleteIcon } from "./Icons";
import { SaveIcon } from "./Icons";

import { Input, Button } from "@nextui-org/react";

//Redux
import {
  setCategoryItems,
  selectCategoryItems,
  selectFormattedCurrentDate,
} from "@/lib/features/expense/expenseSlice";
import {
  selectIncomeArray,
  setIncomeArray,
  setEditedValue,
  selectEditedValue,
  setEditItemID,
  selectEditItemID,
  setTriggered,
  selectTriggered,
} from "@/lib/features/income/incomeSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import deleteIncome from "../lib/fetchFunctions/income/deleteIncome";
import getIncome from "../lib/fetchFunctions/income/getIncome";
import postIncome from "../lib/fetchFunctions/income/postIncome";
import updateIncome from "../lib/fetchFunctions/income/updateIncome";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

const IncomeRenderCell = ({ income, columnKey }) => {
  const cellValue = income[columnKey];

  const dispatch = useAppDispatch();
  const getData = useAppSelector(selectIncomeArray);
  const categoryItems = useAppSelector(selectCategoryItems);
  const formattedDate = useAppSelector(selectFormattedCurrentDate);
  const editedValue = useAppSelector(selectEditedValue);
  const editItemID = useAppSelector(selectEditItemID);
  const triggered = useAppSelector(selectTriggered);

  const startEditing = () => {
    dispatch(setEditItemID(income.IncomeID));
    dispatch(setEditedValue(income));
  };

  const cancelEditing = () => {
    dispatch(setEditItemID(null));
    dispatch(setEditedValue(income));
  };

  const saveEditing = () => {
    dispatch(setEditItemID(null));
    //calling Update(PUT) function
    handleUpdate(income.IncomeID);
  };

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  //editing present data
  const handleUpdate = async (IncomeID) => {
    try {
      // Perform PUT request with the updated expense data
      const response = await updateIncome(IncomeID, editedValue);
      dispatch(setTriggered(!triggered));
    } catch (error) {
      console.error("Error updating expense:", error.message);
    }
  };

  const DeleteIncome = async (IncomeID) => {
    const response = await deleteIncome(IncomeID);
    dispatch(setTriggered(!triggered));
  };

  switch (columnKey) {
    case "Date":
      return (
        <>
          {editItemID === income.IncomeID ? (
            <div>
              <DatePicker
                selected={new Date(cellValue)}
                onChange={(date) =>
                  dispatch(
                    setEditedValue({
                      ...editedValue,
                      [columnKey]: new Date(date),
                    })
                  )
                }
                className="w-full"
                popperPlacement="auto"
                popperModifiers={{
                  preventOverflow: {
                    enabled: true,
                    boundariesElement: "viewport", // Ensure it stays within the viewport
                  },
                }}
              />
            </div>
          ) : (
            <div>
              {new Date(cellValue).toLocaleDateString("en-us", options)}
            </div>
          )}
        </>
      );
    case "Name":
      return editItemID === income.IncomeID ? (
        <Input
          size="xs"
          type="text"
          value={editedValue[columnKey]}
          onChange={(e) =>
            dispatch(
              setEditedValue({ ...editedValue, [columnKey]: e.target.value })
            )
          }
        />
      ) : (
        <div>{income[columnKey]}</div>
      );

    case "Amount":
      return editItemID === income.IncomeID ? (
        <Input
          size="xs"
          type="text"
          value={editedValue[columnKey]}
          onChange={(e) =>
            dispatch(
              setEditedValue({ ...editedValue, [columnKey]: e.target.value })
            )
          }
        />
      ) : (
        <div>{income[columnKey]}</div>
      );
    case "Description":
      return editItemID === income.IncomeID ? (
        <Input
          size="xs"
          type="text"
          value={editedValue[columnKey]}
          onChange={(e) =>
            dispatch(
              setEditedValue({ ...editedValue, [columnKey]: e.target.value })
            )
          }
        />
      ) : (
        <div>{income[columnKey]}</div>
      );
    case "Actions":
      return (
        <div className="relative flex items-center gap-2">
          {editItemID === income.IncomeID ? (
            <>
              <Tooltip color="green" content="Save changes">
                <span
                  onClick={saveEditing}
                  className="text-lg text-green-600 cursor-pointer active:opacity-50"
                >
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
                  onClick={() => DeleteIncome(income.IncomeID)}
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

export default IncomeRenderCell;
