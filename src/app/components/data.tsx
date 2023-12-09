
const columns = [
  {name: "DATE", uid: "date"},
  {name: "ACTIVITY", uid: "activity"},
  {name: "CATEGORY", uid: "category"},
  {name: "AMOUNT", uid: "amount"},
  {name: "DESCRIPTION", uid: "description"},
  {name: "ACTIONS", uid: "actions"},
];

const expenses = [
  { key:1, date: "2023-01-01", activity: "Coding", category: "Development", amount: 100, description: "Worked on a project" },
  { key:2, date: "2023-01-02", activity: "Meeting", category: "Business", amount: 50, description: "Client meeting" },
  { key:3, date: "2023-01-03", activity: "Shopping", category: "Personal", amount: 30, description: "Grocery shopping" },
  { key:4, date: "2023-01-04", activity: "Utilities", category: "Bills", amount: 70, description: "Paid electricity bill" },
  { key:5, date: "2023-01-05", activity: "Dining", category: "Food", amount: 40, description: "Dinner with friends" },
  { key:6, date: "2023-01-06", activity: "Exercise", category: "Health", amount: 0, description: "No cost" },
  { key:7, date: "2023-01-07", activity: "Entertainment", category: "Leisure", amount: 25, description: "Movie night" },
  { key:8, date: "2023-01-08", activity: "Travel", category: "Vacation", amount: 120, description: "Weekend getaway" },
  { key:9, date: "2023-01-09", activity: "Books", category: "Hobbies", amount: 15, description: "Bought a new book" },
  { key:10, date: "2023-01-10", activity: "Home Improvement", category: "Household", amount: 80, description: "Painted the living room" },

];

export {columns, expenses};
