import React from "react";
import { Tooltip } from "@nextui-org/react";
import {EditIcon} from "./Icons";
import {DeleteIcon} from "./Icons";
import {EyeIcon} from "./Icons";

export const RenderCell =((expense, columnKey) => {
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
          <div>
              {cellValue}
          </div>
        );
      case "activity":
        return (
          <div>
              {cellValue}
          </div>
        );
      case "category":
        return (
          <div>
          {cellValue}
      </div>
        );
      case "amount":
        return (
          <div>
          {cellValue}
      </div>
        );
      case "description":
        return (
          <div>
          {cellValue}
      </div>
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
  });
