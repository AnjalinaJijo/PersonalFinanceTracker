import { useEffect, useState, useCallback, useMemo } from "react"

import {Button, Input, DatePicker, Divider,Dropdown,DropdownItem,DropdownMenu,DropdownSection,DropdownTrigger,Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Sub, Chip, Tooltip, getKeyValue} from "@nextui-org/react"

import getSubscriptions from "../lib/getSubscriptions"
import { useSession } from "next-auth/react"
import { getSession } from "next-auth/react";

import { PlusIcon } from "./Icons"
import { Plus } from "./Icons"
import { MultiplyCross } from "./Icons"
import { EyeIcon } from "./Icons"
import { DeleteIcon } from "./Icons"
import { EditIcon} from "./Icons"
import { CheckIcon} from "./Icons"
import { SaveIcon} from "./Icons"

export default function Subscriptions() {

const { data: session } = useSession()

const [triggered, setTriggered] = useState(false);
const [subData, setSubData] = useState([]);
const [addNewClicked,setAddNewClicked] = useState(false)


const [editedValue,setEditedValue] = useState(null)
const [currentID,setCurrentID] = useState(null)
const [unpay,setUnpay] = useState(false)

let lastResetMonth=0;
let lastResetYear=0;




const columns = [
    {name: "NAME", uid: "name"},
    {name: "Amount", uid: "amount"},
    {name: "STATUS", uid: "status"},
    {name: "ACTIONS", uid: "actions"},
  ];
const editColumns = [
    {name: "NAME", uid: "name"},
    {name: "Amount", uid: "amount"},
    {name: "Category", uid: "category"},
    // {name: "Date", uid: "date"},
  ];


 


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
        key:"Entertainment",
        category:"Entertainment"
      },
       {
        key:"Other",
        category:"Other"
      }
    ]

  );


    const currentDate = new Date();
     const year = currentDate.getFullYear();
     const month = String(currentDate.getMonth() + 1).padStart(2, "0");
     const day = String(currentDate.getDate()).padStart(2, "0");
     const formattedDate = `${year}-${month}-${day}`;


    // Get the current month and year for reseting status to unpaid every month
    const currentMonth = currentDate.getMonth() + 1;  // Months are 0-indexed
    const currentYear = currentDate.getFullYear();
    // const[resetSub,setResetSub]= useState(null)


     const [newSubscription, setNewSubscription] = useState({
      name: "",
      amount: null,
      category: "Category",
      // Date: formattedDate
    });


     //Fetch all subscription data 
useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const getResponse = await getSubscriptions();
        setSubData(getResponse);
      } catch (error) {
        console.error("Error fetching goals:", error.message);
      }
    };
  
    fetchSubscriptions();
  }, [triggered,unpay]); // Empty dependency array ensures the effect runs only once,

  console.log('subs',subData)


  useEffect(() => {
    const updateSubscriptions = async () => {
      await Promise.all(
        subData.map(async (sub) => {
          console.log("Inside")
          const lastResetDate = new Date(sub.LastResetDate);
          console.log("lastResetDate",lastResetDate)
          if (lastResetDate !== null) {
            lastResetMonth = lastResetDate.getMonth() + 1;
            lastResetYear = lastResetDate.getFullYear();
          }
            if (
              lastResetDate === null ||
              lastResetMonth !== currentMonth ||
              (lastResetMonth === currentMonth && lastResetYear !== currentYear)
            ) 
            {

              
              const latestSession = await getSession();
              try{
              const update = await fetch(`http://localhost:3500/subscriptions/${sub.subscriptionID}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "authorization": `Bearer ${latestSession?.user.accessToken}`,
                },
                body: JSON.stringify({ ...sub, "status": "Unpaid", "LastResetDate":formattedDate }),
              });
  
              console.log("update", update);
              // setPaidtrue)
              setTriggered(!triggered);
            }
            catch (error) {
              console.error("Error updating expense:", error.message);
            }

            }
          
        })
      );
    };
  
    updateSubscriptions(); // Call the async function
},[subData,currentMonth, currentYear])
  
  const handleAction =(key)=>{
    setNewSubscription({
      ...newSubscription,
      category: key,
    });
  }


  const handleEdit = (subscriptionID,sub) => {
    console.log("handleEdit///")

      setEditedValue({
        subscriptionID: sub.subscriptionID,
        name: sub.subscriptionName,
        amount: sub.subscriptionAmount,
        status: "unpaid",
        category: sub.Category,
      });
      setCurrentID(subscriptionID);
    
  };

  
useEffect(() => {
  console.log('editedValue:', editedValue);
}, [editedValue]);




const handlePay = async(sub) => {
  // Fetch the latest session
const latestSession = await getSession();


  // Pay should reflect in expenses DB
  // try {
    const ExpenseData = await fetch(`http://localhost:3500/expense/${latestSession?.user?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${latestSession?.user.accessToken}`
      },
      body: JSON.stringify({
        "Date": formattedDate,
        "Activity": sub.subscriptionName,
        "Category": sub.Category,
        "Amount": sub.subscriptionAmount,
        "Description": `subscription ${sub.subscriptionID}`
      })
    });
    console.log("After Expense Fetch")
    

    const expense = await ExpenseData.json();
    console.log("update Expense", expense.body.expense);
    
    //get ExpenseID
    const ExpenseID=expense.body.expense.ExpenseID

    // After saving, reset the editing state to null
    const update = await fetch(`http://localhost:3500/subscriptions/${sub.subscriptionID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${latestSession?.user.accessToken}`,
      },
      body: JSON.stringify({...sub, "status": "Paid","ExpenseID":ExpenseID }),
    });
    console.log("update",update)
    // setPaidtrue)
    setTriggered(!triggered);
    // setUnpay(!unpay);
    
  // } catch (error) {
  //   console.error("Error updating expense:", error.message);
  // }
};


    const removePay =async(sub)=>{
      const latestSession = await getSession();

      // Before Deleting, set status back to unpaid and ExpenseId to null to avoid foreignKey violations
      const update = await fetch(`http://localhost:3500/subscriptions/${sub.subscriptionID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${latestSession?.user.accessToken}`,
        },
        body: JSON.stringify({...sub, "status": "Unpaid","ExpenseID":null}),
      });
      console.log("update",update)
      // setPaid(true)
      setTriggered(!triggered);

      const deleteResponse = await fetch(`http://localhost:3500/expense/${sub.ExpenseID}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${latestSession?.user.accessToken}`
        },
      })

      console.log("deleteResponse",deleteResponse)

      setUnpay(!unpay);
      
   

    }

  const renderCell = useCallback((sub, columnKey) => {
    const cellValue = sub[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div>
            {sub.subscriptionName}
          </div>
        );
      case "amount":
        return (
            <div>
            {sub.subscriptionAmount}
          </div>
        );
      case "status":
        return (
            <div>
            {sub.status}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit sub">
              <span onClick={()=>handleEdit(sub.subscriptionID,sub)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            {sub.status==="Paid"?
            (<Tooltip color="danger" content="Remove Payment">
            <span onClick={()=>removePay(sub)} className="text-lg text-danger cursor-pointer active:opacity-50">
              <MultiplyCross />
            </span>
          </Tooltip>)
            :
            (<Tooltip color="danger" content="Pay subscription">
              <span onClick={()=>handlePay(sub)} className="text-lg text-danger cursor-pointer active:opacity-50">
                <CheckIcon />
              </span>
            </Tooltip>)}       
          </div>
        );
      default:
        return cellValue;
    }
  }, []);


  


const handleSaveSub=async()=>{
  console.log("session in savesub",session)
  const GoalData = await fetch(`http://localhost:3500/subscriptions/${session?.user.id}`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "authorization":`Bearer ${session?.user.accessToken}`
    },
    body:JSON.stringify({"Date":formattedDate,"Category":newSubscription.category,"subscriptionName":newSubscription.name,"subscriptionAmount":newSubscription.amount,"status":"Unpaid"}), 
 
  })
  const goal = await GoalData
  // console.log("goal posted",goal)
  //   // After saving, reset the editing state to null
    setAddNewClicked(false)
    setTriggered(!triggered)
    // setPopupVisible(false)
  
}
const handleCancelSub=()=>{
  setAddNewClicked(false)
}


  const renderAddNew = (newSub,editColumns) => (
    <div>
    {editColumns.map((column) => (
      <div key={column.uid} className="m-2">
        {column.uid==="category" ? <Dropdown
          showArrow
          radius="md">
              <DropdownTrigger>
              
                    <Button size="md" className="text-left">{newSub[column.uid]}</Button>
          
              </DropdownTrigger>

              <DropdownMenu aria-label="Categories" items={editColumns} onAction={(key) => handleAction(key)}>           
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


          </Dropdown> :
        <Input
          size="md"
          className="border-blue-600 rounded-sm"
          value={newSub[column.uid]}
          placeholder={column.uid}
          onChange={(e) =>
            setNewSubscription({
              ...newSubscription,
              [column.uid]: e.target.value,
            })
          }
        />
        }

      </div>
    ))}
          <div>
           <Button onClick={handleSaveSub}  className="bg-MediumPurple3">
              Save
            </Button>
            <Button onClick={handleCancelSub}  className="bg-Mulberry">
              Cancel
            </Button>
            </div>
        </div>
  )
   


  const handleUpdate=async()=>{
    const subscriptionID = editedValue.subscriptionID
    try {
      // Perform PUT request with the updated expense data
      const response = await fetch(`http://localhost:3500/subscriptions/${subscriptionID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({"subscriptionName":editedValue["name"],"subscriptionAmount":editedValue["amount"],"Date":formattedDate,"Category":editedValue["category"],"status":"unpaid"}),
      });
      setTriggered(!triggered);
    } catch (error) {
      console.error("Error updating expense:", error.message);
    }
    setEditedValue(null)
  }
  const handleCancelEdit=()=>{
    setEditedValue(null)
  }

  const handleDelete =async(subscriptionID)=>{
    const response = await fetch(`http://localhost:3500/subscriptions/${subscriptionID}`,{
    method:"DELETE",
    headers:{
        "Content-Type":"application/json",
        "authorization":`Bearer ${session?.user.accessToken}`
    },
  })
  console.log(response.json())
  setEditedValue(null)
  setTriggered(!triggered);
  }

  
  const renderEditing = (editedValue, editColumns) => (

    <div>
    {editColumns.map((column) => (
      <div key={column.uid} className="m-2">
        {column.uid==="category" ? <Dropdown
          showArrow
          radius="md">
              <DropdownTrigger>
              
                    <Button size="md" className="text-left">{editedValue[column.uid]}</Button>
          
              </DropdownTrigger>

              <DropdownMenu aria-label="Categories" items={editColumns} onAction={(key) => handleAction(key)}>           
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


          </Dropdown> :
        <Input
          size="md"
          className="border-blue-600 rounded-sm"
          value={editedValue[column.uid]}
          placeholder={column.uid}
          onChange={(e) =>
            setEditedValue({
              ...editedValue,
              [column.uid]: e.target.value,
            })
          }
        />
        }

      </div>
    ))}
          <div>
           <Button onClick={handleUpdate}  className="bg-MediumPurple3">
              Save
            </Button>
            <Button onClick={handleCancelEdit}  className="bg-Mulberry">
              Cancel
            </Button>
            <div>
            <Tooltip color="danger" content="Delete sub">
              <span onClick={()=>handleDelete(editedValue.subscriptionID)} className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
            </div>
            </div>
        </div>

    // console.log("renderEdit")
    // const cellValue = editedValue[columnKey];
  
    // switch (columnKey) {
    //   case "category":
    //     return (
    //       <Dropdown showArrow radius="sm">
    //         <DropdownTrigger>
    //           <Button variant="bordered">{cellValue}</Button>
    //         </DropdownTrigger>
  
    //         <DropdownMenu aria-label="Categories" items={editColumns} onAction={(key) => handleAction(key)}>
    //           {categoryItems.map((item) => (
    //             <DropdownItem key={item.key}>{item.category}</DropdownItem>
    //           ))}
  
    //           <DropdownSection>
    //             <DropdownItem key="new_project" endContent={<Plus className="text-large" />}>
    //               New Project
    //             </DropdownItem>
    //           </DropdownSection>
    //         </DropdownMenu>
    //       </Dropdown>
    //     );
  
    //   default:
    //     return (
    //       <Input
    //         isClearable
    //         size="xs"
    //         className="border-blue-600 rounded-sm"
    //         value={cellValue}
    //         onChange={(e) =>
    //           setEditedValue({
    //             ...editedValue,
    //             [columnKey]: e.target.value,
    //           })
    //         }
    //       />
    //     );
    // }
  )
  
  const handleAddNew = ()=>{
    setAddNewClicked(true)
  }

  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl","bg-lightCream"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
        "h-16"
      ],
    }),
    [],
  );


  return (
    <div className="w-full">
      <div className="flex justify-center items-center mb-5">
          <h1>Monthly Subscription</h1>
          <div className="px-6">
          <Button onClick={handleAddNew} isIconOnly aria-label="Add Goals" className="bg-CarolinaBlue">
              <PlusIcon />
          </Button> 
          </div>  
          </div>

  
                {(!addNewClicked && !editedValue) && 
                <Table hideHeader={!addNewClicked} classNames={classNames} className="text-black" aria-label="Subscription Table">
                <TableHeader  columns={columns}>
                  {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody style={{ backgroundColor: "#F5EEE6" }} className="rounded-xl" items={addNewClicked ? [newSubscription] : subData}>
                  {(item) => (
                    <TableRow key={item.subscriptionID || "new"}>
                      {(columnKey) =>
                       <TableCell className="border-b border-gray-300">
                         {renderCell(item, columnKey)}
                        </TableCell>} 
                    </TableRow>
                  )}
                </TableBody>
              </Table>}


              
              {addNewClicked &&
               renderAddNew(newSubscription, editColumns)}

            {editedValue &&
              renderEditing(editedValue,editColumns)}

              
              </div>

  )
}
