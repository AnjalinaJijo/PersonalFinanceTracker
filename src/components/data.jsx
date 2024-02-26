import { useSession } from "next-auth/react"

const columns = [
  {name: "DATE", uid: "Date"},
  {name: "ACTIVITY", uid: "Activity"},
  {name: "CATEGORY", uid: "Category"},
  {name: "AMOUNT", uid: "Amount"},
  {name: "DESCRIPTION", uid: "Description"},
  {name: "ACTIONS", uid: "Actions"},
];

const IncomeColumn = [
  {name: "DATE", uid: "Date"},
  {name: "NAME", uid: "Name"},
  {name: "AMOUNT", uid: "Amount"},
  {name: "DESCRIPTION", uid: "Description"},
  {name: "ACTIONS", uid: "Actions"},

];

export {columns, IncomeColumn};
