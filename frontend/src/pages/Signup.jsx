import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'; 
import { use } from "react";

const Signup = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        userName:"",
        email:"",
        password:""
    })

    const handleChange = (e) => {
        console.log(e.target.value);
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
    }

    const userSignup = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://deploy-auth-app.vercel.app/auth/signup", userData);
            console.log("Response from signup:", response.data);
            if(response.data.success){
                alert("User created successfully");
                navigate("/login");
            } else {
                alert(response.data.message);
            }
        }catch(err){
            console.error("Error during signup:", err);
        }
    }
return(
    <div className="container">
    <h2>Sign Up</h2>
    <form onSubmit={userSignup}>
    <div>
    <label htmlFor="userName">UserName</label>
    <input onChange={handleChange} type="text" name="userName" required placeholder="Enter Name"/>
    </div>
   <div>
    <label htmlFor="email">Email</label>
    <input onChange={handleChange} type="email" name="email" required placeholder="Enter Email"/>
    </div>
    <div>
     <label htmlFor="password">Password</label>
    <input onChange={handleChange} type="password" name="password" required placeholder="Enter Password"/>
    </div>
    <button>Sign Up</button>
    <span>Already have an account ?
        <Link to="/login"> Login</Link>
    </span>
    </form>
    </div>
    )
}

export default Signup