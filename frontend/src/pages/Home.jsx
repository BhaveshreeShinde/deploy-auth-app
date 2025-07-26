import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetchProducts();
    },[]);

    const fetchProducts = async () => {
        const token = localStorage.getItem("jwtToken")
        const headers = {
            headers:{
                'Authorization': token
            }
        }
        try{
            const response = await axios.get("http://localhost:5000/products", headers);
            console.log("Products fetched:", response.data);
            setProducts(response.data);
        }catch(err){
            console.error("Error fetching products:", err);
        }
    }
return(
    <div>
        <h1>Welcome to home page</h1>
        <ul>
            {products.map((product,index)=>(
            <li key={index}>
                {product.name}
            </li>
            ))}
           
        </ul>
        
    </div>
)
}

export default Home