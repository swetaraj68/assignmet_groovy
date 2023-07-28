import { useNavigate ,Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react"
import axios from "axios"
import style from "./SignUp.module.css"
export default function SignUp(){
    const [fName ,setFName ]=useState("")
    const [lName,setLName]=useState("")
    const [email ,setEmail]=useState("")
    const [password,SetPassword]=useState("")
    const [error ,setError]= useState("")

    const dispatch=useDispatch()
    const navigate =useNavigate()
    const handleSubmit= async (event)=>{
        event.preventDefault();
        const userData ={
            first_name: fName,
            last_name: lName,
            email:email,
            password:password
        };
        try{
            const res = await axios.post("http://74.249.153.209:8081/api/user/signup",userData)
            console.log(res, "hii")
            if(!res.data.success){
                console.log(res.data.message , "error ")
                setError(res.data.message)
        }
        else{
            dispatch({type:"REGISTER-USER",payload :res.data.data})
            alert("SUCCESSFULLY REGISTER");
            navigate("/login")
        }
       
       }
       catch(err){
        console.log(err)
       }
        
      console.log(userData)

    };

    return(
        <><div className={style.mainDiv} >
        <form onSubmit={handleSubmit} className={style.form}>
            <div>

               <h1>Welcome to Poste</h1>  
            </div>
       <div className={style.secDiv}>
      <label htmlFor="FName" className={style.name}>First Name</label>
        <input className={style.input} value={fName} onChange={(e)=>setFName(e.target.value)}
        id="fName"
        />
        </div>
        <div className={style.secDiv}>
            <label htmlFor="LName"className={style.name} >Last Name</label>
            <input value={lName} onChange={(e)=>setLName(e.target.value)} 
            id="lName"/>
        </div>
        <div className={style.secDiv}>
            <label htmlFor="Email" className={style.name} >
             Email
            </label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}
            id="email"/>
        </div>
        <div className={style.secDiv}>
            <label htmlFor="Password" className={style.name}>Password</label>
            <input value={password} onChange={(e)=>SetPassword(e.target.value)}
            id="password"/>
        </div>
        <input type="submit" className={style.subBtn} />
        <p>{error?.toUpperCase()} </p>
        <p>All ready Registered <Link to ="/login">Login</Link></p>
        </form>
        </div>
        
        </>
    )
}