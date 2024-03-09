'use client'

import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { useSession } from "next-auth/react"
import { useMemo, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
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
import {PlusIcon} from "./Icons";
import {columns} from "./data.jsx";
import {RenderCell} from "./RenderCell";
import {RenderEditing} from "./RenderEditing.jsx";

import getExpense from "../lib/getExpense"


export default function TrackerTable() {
  const newKey = uuidv4(); // Generate a unique key

  const [getData, setGetData] = useState([]);
  const [triggered, setTriggered] = useState(false);

  //for RenderEditing
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [categoryItems, setCategoryItems] = useState(
    [
      {
        key:"Grocery",
        category:"Grocery"
      },
      {
        key:"Transport",
        category:"Transport"
      },
      {
        key:"Food",
        category:"Food"
      },
       {
        key:"HealthCare",
        category:"HealthCare"
      },
      {
        key:"Other",
        category:"Other"
      }
    ]

  );




  const [popupVisible, setPopupVisible] = useState(false);

  const { data: session } = useSession()
  // console.log(session)

      // Get the current local date
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;




        //for editing
  // const [isEditing, setIsEditing] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [editedValue, setEditedValue] = useState({"ExpenseID":null, "Date": formattedDate, "Activity": "", "Category":"", "Amount": 0, "Description": "" });




  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const getResponse = await getExpense();
        setGetData(getResponse);
        console.log('response',getResponse)
      } catch (error) {
        console.error("Error fetching expenses:", error.message);
      }
    };

    fetchExpenses();
  }, [triggered]); // Empty dependency array ensures the effect runs only once,


  
  // console.log('getData',getData)
  const rowsPerPage = 6
  // const [editData,setEditData] = useState({ "ExpenseID":"", "Date": formattedDate, "Activity": "", "Category":"", "Amount": 0, "Description": "" })
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null); // Track the editing state
  const pages = Math.ceil(getData.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    // Include the editing row if it exists
  const itemsWithEditing = editing ? [...getData.slice(start, end), editing] : getData.slice(start, end);
  

    // return getData.slice(start, end)
    return itemsWithEditing;
  }, [getData,page,editing])


  useEffect(() => {
    console.log('page:', page);
    console.log('pages:', pages);
  }, [page, pages]);
 
  
const handleAddNew =(e)=>{
  e.preventDefault()
  setEditing({ "ExpenseID":newKey, "Date": formattedDate, "Activity": "", "Category":"", "Amount": 0, "Description": "" });
  console.log(editing)
}
const handleSave = async(e) => {
  e.preventDefault()
  if (editing?.Activity==="" || editing?.Category==="") {
    setPopupVisible(true);
    return;
  }

  // Add logic to save the new row data to your data source
  console.log(session?.user.id)
  console.log(editing)
  const ExpenseData = await fetch(`http://localhost:3500/expense/${session?.user.id}`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "authorization":`Bearer ${session?.user.accessToken}`
    },
    body:JSON.stringify(editing), 
  })
  const expense = await ExpenseData.json()
  console.log(expense)
  //   // After saving, reset the editing state to null
    setEditing(null);
    setTriggered(!triggered);
    setPopupVisible(false)
  };

  const DeleteExpense = async (e,expenseID)=>{
    e.preventDefault()
    const response = await fetch(`http://localhost:3500/expense/${expenseID}`,{
    method:"DELETE",
    headers:{
        "Content-Type":"application/json",
        "authorization":`Bearer ${session?.user.accessToken}`
    },
  })
  console.log(response.json())
  setTriggered(!triggered);

  }


  //editing present data
  const handleUpdate = async(expenseID)=>{
    try {
      // Perform PUT request with the updated expense data
      const response = await fetch(`http://localhost:3500/expense/${expenseID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify(editedValue),
      });
      setTriggered(!triggered);
    } catch (error) {
      console.error("Error updating expense:", error.message);
    }
  }



  const topContent = useMemo(() => {
    return (


      <div className="flex justify-end">
   
        <div>
          {editing ? (
            <>
              <Button onClick={handleSave} className="bg-MediumPurple3">
                Save
              </Button>
              <Button onClick={() => setEditing(null)} className="ml-2">
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={handleAddNew} className="bg-MediumPurple3" endContent={<PlusIcon />}>
              Add New
            </Button>
          )}
        </div>
      </div>
    );
  }, [editing]);


  return (
    <>

{popupVisible && (
        <div className="popup">
          <p>Please fill in all the required fields.</p>
          <Button onClick={() => setPopupVisible(false)}>OK</Button>
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
  
      <TableHeader columns={columns} >
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={items} editing={editing}>
  {items.map((item) => (
    <TableRow key={item.ExpenseID}>
      {(columnKey) => (
        <TableCell key={columnKey}>
          {editing && editing.ExpenseID === item.ExpenseID ? (
           RenderEditing({editing,setEditing,columnKey,handleSave,isNewCategory,setIsNewCategory,categoryItems, setCategoryItems})
          ) : (
            RenderCell(item,columnKey,DeleteExpense,handleUpdate,currentID,setCurrentID,editedValue,setEditedValue)
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
