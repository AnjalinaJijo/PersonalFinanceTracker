"use client";
import React from "react";
// import { useSession } from "next-auth/react"
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "./Icons";
import { DeleteIcon } from "./Icons";
import { SaveIcon } from "./Icons";
import { EyeIcon } from "./Icons";
import { Input } from "@nextui-org/react";

//Redux
import {
  setCategoryItems,
  selectCategoryItems,
  selectFormattedCurrentDate,
} from "@/lib/features/expense/expenseSlice";
import {
  selectIncomeArray,
  setIncomeArray,
  setEditItemID,
  selectEditItemID,
  setAddNew,
  selectAddNew,
  setTriggered,
  selectTriggered,
  setPopupVisible,
  selectPopupVisible
} from "@/lib/features/income/incomeSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import getIncome from "../lib/fetchFunctions/income/getIncome";
import postIncome from "../lib/fetchFunctions/income/postIncome";
import updateIncome from "../lib/fetchFunctions/income/updateIncome";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

const IncomeRenderEditing = ({ columnKey }) => {
  const dispatch = useAppDispatch();
  const getData = useAppSelector(selectIncomeArray);
  const categoryItems = useAppSelector(selectCategoryItems);
  const formattedDate = useAppSelector(selectFormattedCurrentDate);
  const addNew = useAppSelector(selectAddNew);
  const triggered = useAppSelector(selectTriggered);
  const popupVisible = useAppSelector(selectPopupVisible);


  const cellValue = addNew[columnKey];

  const handleSave = async () => {
    if (addNew?.Name === "") {
      dispatch(setPopupVisible(true));
      return;
    }

    // Add logic to save the new row data to your data source
    const income = await postIncome(addNew);
    //   // After saving, reset the addNew state to null
    dispatch(setAddNew(null));
    dispatch(setTriggered(!triggered));
    dispatch(setPopupVisible(false));
  };

  switch (columnKey) {
    case "Date":
      return (
        <div>
          <DatePicker
            selected={new Date(cellValue)}
            onChange={(date) =>
              dispatch(
                setAddNew({
                  ...addNew,
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
      );
    case "Actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip color="green" content="Save user">
            <span
              onClick={handleSave}
              className="text-lg text-green-600 cursor-pointer active:opacity-50"
            >
              <SaveIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span
              onClick={() => dispatch(setAddNew(null))}
              className="text-lg text-danger cursor-p ointer active:opacity-50"
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );

    default:
      return (
        <Input
          isClearable
          size="xs"
          className="border-blue-600 rounded-sm"
          value={cellValue}
          onChange={(e) =>
            dispatch(setAddNew({ ...addNew, [columnKey]: e.target.value }))
          }
        />
      );
  }
};

export default IncomeRenderEditing;
