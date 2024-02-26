'use client'
import React,{useState} from "react";
// import { useSession } from "next-auth/react"
import { Dropdown, Tooltip, DropdownTrigger, Button, DropdownItem, DropdownMenu, DropdownSection } from "@nextui-org/react";
import {EditIcon} from "./Icons";
import {DeleteIcon} from "./Icons";
import {SaveIcon} from "./Icons";
import {EyeIcon} from "./Icons";
import { Input } from "@nextui-org/react";
import {Plus} from "./Icons"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

export const RenderEditing = ({editing, setEditing,columnKey,handleSave,isNewCategory,setIsNewCategory,categoryItems,setCategoryItems}) => {
  const cellValue = editing[columnKey];
  // const [isNewProject, setNewProject] = useState(false);
   
    const handleAction = (key) => {
      if (key === "new_project") {
        setIsNewCategory(true)
        setEditing({...editing,[columnKey]:""})
      } else {
        setEditing({ ...editing, [columnKey]: key });
      }
    };
  
    // const handleSaveNewProject = () => {
    //   // Save the new project value to the items array
    //   const newProject = {
    //     key: cellValue,
    //     category: cellValue,
    //   };
  
    //   isNewProject = false;
    //   // You may want to perform additional validation before saving
    //   setEditing({ ...editing, [columnKey]: cellValue });
    // };

    const handleDrop=()=>{
      setIsNewCategory(false)
      setEditing({ ...editing, [columnKey]: cellValue })
    }
    

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

        case "Category":
          return(

            <div>

          {isNewCategory ? (
            <Input
              value={cellValue}
              onChange={(e) => setEditing({ ...editing, [columnKey]: e.target.value })}
              onBlur={handleDrop}
            />
          ) : (
            <Dropdown
            showArrow
            radius="sm">
                <DropdownTrigger>
                
                      <Button variant="bordered">{cellValue}</Button>
            
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
          )}
            </div>

          )
          
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