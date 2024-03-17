"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { useMemo, useState, useEffect } from "react";

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
  getKeyValue,
} from "@nextui-org/react";
import { PlusIcon } from "./Icons";
import { IncomeColumn } from "./data.jsx";
import IncomeRenderCell from "./IncomeRenderCell";
import IncomeRenderEditing from "./IncomeRenderEditing.jsx";

import getIncome from "../lib/fetchFunctions/income/getIncome";
import postIncome from "../lib/fetchFunctions/income/postIncome";
import updateIncome from "../lib/fetchFunctions/income/updateIncome";

//Redux
import {
  setCategoryItems,
  selectCategoryItems,
  selectFormattedCurrentDate,
} from "@/lib/features/expense/expenseSlice";
import {
  selectIncomeArray,
  setIncomeArray,
  setAddNew,
  selectAddNew,
  setEditItemID,
  selectEditItemID,
  setTriggered,
  selectTriggered,
  setPopupVisible,
  selectPopupVisible
} from "@/lib/features/income/incomeSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

export default function IncomeTable() {
  const newKey = uuidv4(); // Generate a unique key

  const dispatch = useAppDispatch();
  const getData = useAppSelector(selectIncomeArray);
  const categoryItems = useAppSelector(selectCategoryItems);
  const formattedDate = useAppSelector(selectFormattedCurrentDate);
  const editItemID = useAppSelector(selectEditItemID);
  const addNew = useAppSelector(selectAddNew);
  const triggered = useAppSelector(selectTriggered);
  const popupVisible = useAppSelector(selectPopupVisible);

  // const [getData, setGetData] = useState([]);
  // const [triggered, setTriggered] = useState(false);

  // const [popupVisible, setPopupVisible] = useState(false);

  //for editing
  // const [isEditing, setIsEditing] = useState(false);
  // const [editItemID, setEditItemID] = useState(null);
  // const [editedValue, setEditedValue] = useState({"IncomeID":null, "Date": formattedDate, "Name": "", "Amount": 0, "Description": "" });

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const getResponse = await getIncome();
        dispatch(setIncomeArray(getResponse));
        // console.log('response',getResponse)
      } catch (error) {
        console.error("Error fetching expenses:", error.message);
      }
    };

    fetchIncome();
  }, [triggered]); // Empty dependency array ensures the effect runs only once,

  // console.log('getData',getData)
  const rowsPerPage = 6;
  // const [editData,setEditData] = useState({ "ExpenseID":"", "Date": formattedDate, "Activity": "", "Category":"", "Amount": 0, "Description": "" })
  const [page, setPage] = useState(1);
  // const [editing, setEditing] = useState(null); // Track the editing state
  const pages = Math.ceil(getData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    // Include the editing row if it exists
    const itemsWithEditing = addNew
      ? [...getData.slice(start, end), addNew]
      : getData.slice(start, end);

    // return getData.slice(start, end)
    return itemsWithEditing;
  }, [getData, page, addNew]);

  const handleAddNew = () => {
    dispatch(
      setAddNew({
        IncomeID: null,
        Date: formattedDate,
        Name: "",
        Amount: 0,
        Description: "",
      })
    );
  };
  const handleSave = async () => {
    if (addNew?.Name === "") {
      dispatch(setPopupVisible(true));
      return;
    }

    // Add logic to save the new row data to your data source
    const income = await postIncome(addNew);
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
              <Button onClick={()=>handleSave()} className="bg-MediumPurple3">
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
          <Button onClick={() =>  dispatch(setPopupVisible(false))}>OK</Button>
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
        <TableHeader columns={IncomeColumn}>
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
            <TableRow key={item.IncomeID}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {addNew && addNew.IncomeID === item.IncomeID ? (
                    <IncomeRenderEditing columnKey={columnKey} />
                  ) : (
                    <IncomeRenderCell income={item} columnKey={columnKey} />
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
