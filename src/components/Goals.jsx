import { useEffect,useState } from "react"

import {PlusIcon} from "./Icons";
import {Plus} from "./Icons";
import {Button,Tooltip,Slider,Input,Dropdown,DropdownItem,DropdownMenu,DropdownSection,DropdownTrigger,Progress} from "@nextui-org/react";


import { useSession } from "next-auth/react"
import { getSession } from "next-auth/react";

import getGoals from "../lib/getGoals"
import {EditIcon} from "./Icons"


const Goals = (monthlyExpenseCategory) => {

  const [addNewClicked,setAddNewClicked] = useState(false)
  const [GoalAmount,setGoalAmount] = useState(0)
  const [category,setCategory] = useState("Select New Goal")

  const [triggered, setTriggered] = useState(false);
  const [getGoalData, setGetGoalData] = useState([]);
  const [editing, setEditing] = useState(null);
  // const [isNeg, setIsNeg] = useState(false);
  // let diff=0;
  let excess=0;
  let isNeg=false



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

  const { data: session } = useSession()
     // Get the current local date
     const currentDate = new Date();
     const year = currentDate.getFullYear();
     const month = String(currentDate.getMonth() + 1).padStart(2, "0");
     const day = String(currentDate.getDate()).padStart(2, "0");
     const formattedDate = `${year}-${month}-${day}`;



// useEffect(()=>{

// },[])

const handleAddNew = ()=>{
  setAddNewClicked(true)
}

const handleSliderChange = (value)=>{
  setGoalAmount(value)
}

const handleAction =(key)=>{
  setCategory(key)
}

const handleCancel = ()=>{
  setAddNewClicked(false)
}
const handleEdit = (goal)=>{
  setEditing({"GoalID":goal.GoalID,"Category":goal.Category,"GoalAmount":goal.GoalAmount,"Date":formattedDate})
}
const handleEditDrop = (key)=>{
  setEditing({
    ...editing,
    "Category":key
  })

  
}
const handleEditSlider = (values)=>{
  const value = values[0]
 setEditing({
  ...editing,
  "GoalAmount":value
 })
  
}
const handleEditSave = async (goal)=>{

  console.log("editing",editing)
  console.log("goal",goal)
  //Update
  const latestSession = await getSession();
  try {
    // Perform PUT request with the updated expense data
    const response = await fetch(`http://localhost:3500/goals/${goal.GoalID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${latestSession?.user.accessToken}`,
      },
      body: JSON.stringify({"Category":editing.Category,"GoalAmount":editing.GoalAmount,"Date":editing.Date}),
    });
    setTriggered(!triggered);
    setEditing(null)
  } catch (error) {
    console.error("Error updating expense:", error.message);
  }

  
}
const handleEditCancel = ()=>{
  setEditing(null) 
}

//Fetch all goal data 
useEffect(() => {
  const fetchExpenses = async () => {
    try {
      const getResponse = await getGoals();
      setGetGoalData(getResponse);
      // console.log('Goals',getResponse)
    } catch (error) {
      console.error("Error fetching goals:", error.message);
    }
  };

  fetchExpenses();
}, [triggered]); // Empty dependency array ensures the effect runs only once,


const handleGoal=async(e)=>{

  const GoalData = await fetch(`http://localhost:3500/goals/${session?.user.id}`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "authorization":`Bearer ${session?.user.accessToken}`
    },
    body:JSON.stringify({"Date":formattedDate,"Category":category,"GoalAmount":GoalAmount}), 
  })
  const goal = await GoalData
  // console.log("goal posted",goal)
  //   // After saving, reset the editing state to null
    setAddNewClicked(false)
    setTriggered(!triggered)
    // setPopupVisible(false)

}

// console.log("monthlyExpenseCategory",monthlyExpenseCategory)

  return (
    <div className="m-5 w-full px-5">
       <div className="flex justify-center items-center">
          <h1>Goal Progress</h1>
          <div className="px-6">
          <Button onClick={handleAddNew} isIconOnly aria-label="Add Goals" className="bg-CarolinaBlue">
              <PlusIcon />
          </Button> 
          </div>  
          </div>

          

          {getGoalData.map((goal) => {
          isNeg = false;
          const category = goal.Category;
          const goalValue = goal.GoalAmount;
          const spending = monthlyExpenseCategory.monthlyExpenseCategory[category] || 0;

          if (goalValue < spending) {
            isNeg = true;
            excess = ((spending - goalValue) / goalValue) * 100;
          }

          return (
            <div key={category} className="max-w-md relative my-5">
              {editing && editing.GoalID === goal.GoalID ? (
                <div>
                  {/* Render content for editing state */}

                  <div>

                      <div className="flex my-3 justify-between">
                      <Dropdown
                      showArrow
                      radius="sm"
                      >
                          <DropdownTrigger>
                                <Button variant="bordered">{editing.Category}</Button>
                          </DropdownTrigger>

                          <DropdownMenu aria-label="Categories" items={categoryItems} onAction={(key) => handleEditDrop(key)}>
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

                      <Button onClick={()=>handleEditSave(goal)}  className="bg-MediumPurple3">
                        Save
                      </Button>
                      <Button onClick={handleEditCancel}  className="bg-Mulberry">
                        Cancel
                      </Button>

                      </div>

                      <Slider 
                        label="Price Range" 
                        showTooltip={true}
                        // formatOptions={{style: 'currency', currency: 'JPY'}}
                        // tooltipValueFormatOptions={{style: 'currency', currency: 'JPY'}}
                        defaultValue={editing.GoalAmount}
                        maxValue={3000}
                        className=""
                        color="foreground"
                        onChange={handleEditSlider}
                        />
                        </div>

                </div>
              ) : (
                <div>
                  {isNeg ? (
                    <p className="text-sm text-red-600">
                      Oops! {category} spending this month exceeded by {excess.toFixed(2)}%
                    </p>
                  ) : null}

                  <div className="absolute right-0 bottom-3 mb-2 mr-2 text-sm text-white">
                    <div className="flex gap-3">
                      {`${spending}/${goalValue}`}
                      <Tooltip content="Edit sub">
                        <span onClick={() => handleEdit(goal)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Tooltip>
                    </div>
                  </div>

                  <div>
                    {/* Render content for non-editing state */}
                    <Progress
                      key={category}
                      label={category}
                      value={spending}
                      maxValue={isNeg ? spending : goalValue}
                      color={isNeg ? "warning" : "primary"}
                      showValueLabel={false}
                      className="max-w-md"
                    />
                  </div>
                </div>
              )}
            </div>
  );
})}


{addNewClicked?
          (    
            <div>

           <div className="flex my-3 justify-between">
            <Dropdown
            showArrow
            radius="sm"
            >
                <DropdownTrigger>
                      <Button variant="bordered">{category}</Button>
                </DropdownTrigger>

                <DropdownMenu aria-label="Categories" items={categoryItems} onAction={(key) => handleAction(key)}>
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

            <Button onClick={handleGoal}  className="bg-MediumPurple3">
              Save
            </Button>
            <Button onClick={handleCancel}  className="bg-Mulberry">
              Cancel
            </Button>

            </div>

          <Slider 
              label="Price Range" 
              showTooltip={true}
              // formatOptions={{style: 'currency', currency: 'JPY'}}
              // tooltipValueFormatOptions={{style: 'currency', currency: 'JPY'}}
              defaultValue={40}
              maxValue={3000}
              className=""
              color="foreground"
              onChange={handleSliderChange}
              />
              </div>
    ):
          (null)
          
          }



    </div>
  )
}

export default Goals

