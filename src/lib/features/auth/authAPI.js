//async request for login data
export const login = async (username,password) => {
    const response = await fetch("http://localhost:3500/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })
    })
    const result = await response.json();
  
    return result;
  };