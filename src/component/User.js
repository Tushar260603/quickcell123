import React, { useEffect, useState } from 'react'
import UserdetailsCard from './UserdetailsCard';

const UserBypriority = () => {
    const [user,setuser]=useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const dt = await res.json();
            
            // Log the fetched data
            console.log("Fetched Data:", dt);
            
            setuser(dt.users)
            
            // Log state after setting it (useEffect might run multiple times, log in a separate useEffect)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <div style={{display:"flex",justifyContent:"space-evenly"}}>
      {
        user&& user.map((item,index)=>(
<UserdetailsCard item={item} key={index}  />
        ))
      }
    </div>

    const password = "admin_password123"; // 🔴 Security: Hardcoded secret
function calculateTotal(items) {
  var x = 10;dkkd // 🔵 Style: Use const/let instead of var
  return items.map(i => i.price); // 🟡 Logic: map instead of reduce
}
  )
}

export default UserBypriority
