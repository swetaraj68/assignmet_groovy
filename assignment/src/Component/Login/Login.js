import { useState } from "react"
import axios from "axios"
import style from "./Login.module.css"
import { Navigate, useNavigate ,Link } from "react-router-dom"
export default function Login(){
    const [email,setEmail]=useState("")
    const [password ,SetPassword]=useState("")
    const [error,setError]=useState("")
    const navigate= useNavigate("")
    const handleSubmit = async(event)=>{
        event.preventDefault()
        const userData ={
            email:email,
            password:password
        }
        try{
            const res = await axios.post(
                "http://74.249.153.209:8081/api/user/login",userData
            )
            console.log(res)
            if(!res.data.message){
                setError(res.data.message)
            }
            else{
                alert("SUCESSFULLY LOGIN");
                const token =res.data.token
                const user = res.data.data;
                localStorage.setItem("token",token)
                localStorage.setItem("user",JSON.stringify(user))
                navigate("/home")
            }
        }
        catch(err){
            console.log(err)
        }
        console.log(userData)
    }
    return(
        <><div className={style.mainDiv}>
        <form onSubmit={handleSubmit}>
            <div className="style.mainDiv">
                <h2 className={style.heading}>
                    Welcome to Poste
                </h2>
            </div>
        <div className={style.email}>
            <label htmlFor="email">
              Email
            </label>
            <input className={style.emailInput} value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
                setError("")
            }}
            id="email"
            />
        </div>
        <div className={style.password}>
          <label htmlFor="password">
            Password

          </label>
          <input className={style.passInput} value={password}
          onChange={(e)=>{
            SetPassword(e.target.value)
            setError("")
          }}
          id ="password"
          />
        </div>
        <input type="submit" className={style.btn}/>
        <p>{error?.toUpperCase()}</p>
        <p>Not Registered ? <Link to ="/">SignUp</Link></p>
        </form>
        </div>
        </>)

    
}