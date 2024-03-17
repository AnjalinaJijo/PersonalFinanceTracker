"use client";
import {
  Dropdown,
  Tooltip,
  DropdownTrigger,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
} from "@nextui-org/react";
import { EditIcon } from "./Icons";
import { DeleteIcon } from "./Icons";
import { SaveIcon } from "./Icons";
import { EyeIcon } from "./Icons";
import { Input } from "@nextui-org/react";
import { Plus } from "./Icons";

//redux
import {
  setTriggered,
  selectTriggered,
  selectAddNew,
  setAddNew,
  selectPopupVisible,
  setPopupVisible,
  setCategoryItems,
  selectCategoryItems,
} from "@/lib/features/expense/expenseSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import postExpense from "@/lib/fetchFunctions/expense/postExpense";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

const RenderEditing = ({ columnKey }) => {
  const dispatch = useAppDispatch();
  const triggered = useAppSelector(selectTriggered);
  const addNew = useAppSelector(selectAddNew);
  const categoryItems = useAppSelector(selectCategoryItems);
  // const popupVisible= useAppSelector(selectPopupVisible)

  const handleSave = async () => {
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

  const cellValue = addNew[columnKey];

  const handleAction = (key) => {
      dispatch(setAddNew({ ...addNew, [columnKey]: key }));
  };

  const handleDrop = () => {
    setIsNewCategory(false);
    dispatch(setAddNew({ ...addNew, [columnKey]: cellValue }));
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

    case "Category":
      return (
        <div>
            <Dropdown showArrow radius="sm">
              <DropdownTrigger>
                <Button variant="bordered">{cellValue}</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Categories"
                items={categoryItems}
                onAction={(key) => handleAction(key)}
              >
                {categoryItems.map((item) => (
                  <DropdownItem
                    key={item.key}
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
export default RenderEditing;
