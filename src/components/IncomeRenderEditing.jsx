'use client'
import React from "react";
// import { useSession } from "next-auth/react"
import { Tooltip } from "@nextui-org/react";
import {EditIcon} from "./Icons";
import {DeleteIcon} from "./Icons";
import {SaveIcon} from "./Icons";
import {EyeIcon} from "./Icons";
import { Input } from "@nextui-org/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

export const IncomeRenderEditing = ({editing, setEditing,columnKey,handleSave}) => {
  const cellValue = editing[columnKey];
    switch (columnKey) {
        case "Date":
          return (
           <div><DatePicker
           selected={new Date(cellValue)}
           onChange={(date) =>
             setEditing({
               ...editing,
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
         /></div>
          );
        case "Actions":
          return (
            <div className="relative flex items-center gap-2">
             <Tooltip color="green" content="Save user">
              <span onClick={handleSave} className="text-lg text-green-600 cursor-pointer active:opacity-50">
                <SaveIcon />
              </span>
            </Tooltip>
          <Tooltip color="danger" content="Delete user">
              <span onClick={() => setEditing(null)} className="text-lg text-danger cursor-p ointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>)

        default:
          return(
            <Input
              isClearable
              size='xs'
              className="border-blue-600 rounded-sm"
              value={cellValue}
              onChange={(e) => setEditing({ ...editing, [columnKey]: e.target.value })}
            />
          );
      }
    

}