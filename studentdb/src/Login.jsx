import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Popup from "./Popup";
function Login(){

    const [Email,SetEmail] = useState("");
    const [Password,SetPassWord] = useState("");
    const [IsChecked,SetIsChecked] = useState(false);
    const [IsLoggedIn,SetLoggedIn] = useState(false);
    const navigate = useNavigate();
    function EmailSetter(event){
        SetEmail(event.target.value);
    }

    function PasswordSetter(event){
        SetPassWord(event.target.value)

    }

    function IsCheckedSetter(event){
        // console.log(event.target.checked);
        SetIsChecked(event.target.checked)

    }
    function Submitted(){
        if(Email==="hi123@gmail.com"){
            if(Password==="12345"){
                if(IsChecked==true){
                    navigate("/form");
                }
            }
        }
    }

return(<>
    <Popup /> 
<div className=".form">
<form style={{width:"50%",margin:"10vh auto"}}>
<h1>Login</h1>
  <div className="mb-3">
    <label  className="form-label">Email address</label>
    <input type="email" className="form-control" value={Email} onChange={EmailSetter} required/>
  </div>

  <div className="mb-3">
    <label  className="form-label">Password</label>
    <input type="password" className="form-control" value={Password} onChange={PasswordSetter} required/>
  </div>

  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" checked={IsChecked} onChange={IsCheckedSetter} required/>
    <label className="form-check-label">Confirm Login</label>
  </div>
    {(Email.length>0 && Email!="hi123@gmail.com")?<p>Incorrect Email Address</p>:
    (Password.length>0 && Password!="12345")?<p>Incorrect Password</p>:
    (Email.length>0 && Password.length>0 && IsLoggedIn==true && IsChecked==false)?<p>please Confirm Login</p>:""}
  <button type="submit" className="btn btn-danger" onClick={()=>{Submitted();SetLoggedIn(true)}} >Login</button>
</form>
</div>
<div className="password">
  <p><b>Email:</b> hi123@gmail.com</p>
  <p><b>Password:</b> 12345</p>
</div>
</>)}
export default Login;