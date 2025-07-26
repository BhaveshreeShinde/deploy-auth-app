import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email:"",
        password:""
    })

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
        [e.target.name]:e.target.value
        })
    }

const userLogin = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:5000/auth/login", loginData);
        console.log("Response from login:", response.data);
        if(response.data.success){
            alert("Login successful");
            // Store JWT token in localStorage or context
            localStorage.setItem("jwtToken", response.data.jwtToken);
            navigate("/home");
        } else {
            alert(response.data.message);
        }
    }catch(err){
        console
    }
}

return(
    <div className="container">
    <h2>Log In</h2>
    <form onSubmit={userLogin}>
   <div>
    <label htmlFor="email">Email</label>
    <input onChange={handleChange} type="email" name="email" required placeholder="Enter Email"/>
    </div>
    <div>
     <label htmlFor="password">Password</label>
    <input onChange={handleChange} type="password" name="password" required placeholder="Enter Password"/>
    </div>
    <button>Log In</button>
    <span>Don't have an account ?
        <Link to="/signup"> Sign Up</Link>
    </span>
    </form>
    </div>
)
}

export default Login