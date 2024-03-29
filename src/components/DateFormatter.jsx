

const currentDate = new Date();
const year = currentDate.getFullYear();

export const DateFormatter =()=>{
    // to return current date in yyyy-mm-dd format
    
     const month = String(currentDate.getMonth() + 1).padStart(2, "0");
     const day = String(currentDate.getDate()).padStart(2, "0");
     const formattedDate = `${year}-${month}-${day}`;

     return formattedDate
}