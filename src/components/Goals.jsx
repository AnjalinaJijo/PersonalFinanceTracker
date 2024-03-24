import { useEffect,useState } from "react"

import {PlusIcon} from "./Icons";
import {Plus} from "./Icons";
import {DeleteIcon} from "./Icons";
import {Button,Tooltip,Slider,Input,Dropdown,DropdownItem,DropdownMenu,DropdownSection,DropdownTrigger,Progress} from "@nextui-org/react";

//redux
import { selectGoalArray, setGoalArray } from "@/lib/features/goal/goalSlice";
import { selectCurrentMonthAbbreviation } from "@/lib/features/global/globalSlice";
import {setCategoryItems,selectCategoryItems, selectFormattedCurrentDate,setCategoryCurrMonthExpense,selectCategoryCurrMonthExpense,} from "@/lib/features/expense/expenseSlice";
import {useAppSelector, useAppDispatch } from "@/lib/hooks"

import getGoal from "../lib/fetchFunctions/goal/getGoal"
import postGoal from "../lib/fetchFunctions/goal/postGoal"
import updateGoal from "../lib/fetchFunctions/goal/updateGoal"
import deleteGoal from "../lib/fetchFunctions/goal/deleteGoal"
import {EditIcon} from "./Icons"


const Goals = () => {
  const dispatch = useAppDispatch();
  const getGoalData = useAppSelector(selectGoalArray)
  const categoryItems = useAppSelector(selectCategoryItems);
  const formattedDate = useAppSelector(selectFormattedCurrentDate);
  const categoryCurrMonthExpense = useAppSelector(selectCategoryCurrMonthExpense);
  const currMonth = useAppSelector(selectCurrentMonthAbbreviation);




  const [addNewClicked,setAddNewClicked] = useState(false)
  const [GoalAmount,setGoalAmount] = useState(0)
  const [category,setCategory] = useState("Select New Goal")

  const [triggered, setTriggered] = useState(false);
  const [editing, setEditing] = useState(null);
  let excess=0;
  let isNeg=false

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
  // const latestSession = await getSession();
  try {
    // Perform PUT request with the updated expense data
    const body= {"Category":editing.Category,"GoalAmount":editing.GoalAmount,"Date":editing.Date}
    const response = await updateGoal(goal.GoalID,body)
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
      const getResponse = await getGoal();
      dispatch(setGoalArray(getResponse))
    } catch (error) {
      console.error("Error fetching goals:", error.message);
    }
  };

  fetchExpenses();
}, [triggered]); // Empty dependency array ensures the effect runs only once,


const handleGoal=async(e)=>{
  const body = {"Date":formattedDate,"Category":category,"GoalAmount":GoalAmount}
  const goal = await postGoal(body)

  //   // After saving, reset the editing state to null
    setAddNewClicked(false)
    setTriggered(!triggered)
    // setPopupVisible(false)

}

const DeleteGoal= async(GoalID) =>{
  console.log("GoalID",GoalID)
  const res = await deleteGoal(GoalID)
  //   // After saving, reset the editing state to null
    setAddNewClicked(false)
    setTriggered(!triggered)
    // setPopupVisible(false)

}



// console.log("categoryCurrMonthExpense",categoryCurrMonthExpense)

  return (
    <div className="m-5 w-full px-5">
       <div className="flex justify-center items-center">
          <h1> {currMonth} Goal Progress</h1>
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
          const spending = categoryCurrMonthExpense[category] || 0;

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
                      <Tooltip color="danger" content="Delete user">
                          <span
                            onClick={() => DeleteGoal(goal.GoalID)}
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                          >
                            <DeleteIcon />
                          </span>
                        </Tooltip>

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

