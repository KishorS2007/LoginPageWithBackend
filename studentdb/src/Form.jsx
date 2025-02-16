import { useEffect, useState } from "react";

function Form(){

    const [s1,Sets1] = useState(0);
    const [s2,Sets2] = useState(0);
    const [s3,Sets3] = useState(0);
    const [s4,Sets4] = useState(0);
    const [s5,Sets5] = useState(0);
    const [Name,SetName] = useState("");
    const [IsPopup,SetIsPopup] = useState(false);
    // const [db,Setdb] = useState([])
    const [Edits1,SetEdits1] = useState(0);
    const [Edits2,SetEdits2] = useState(0);
    const [Edits3,SetEdits3] = useState(0);
    const [Edits4,SetEdits4] = useState(0);
    const [Edits5,SetEdits5] = useState(0);
    const [EditName,SetEditName] = useState("");
    const [IdName,SetIdName] = useState("");


    const [arr,Setarr] = useState([]);

   const fetcher = ()=>{
        fetch('http://localhost:8000/studentmark').then(res=>res.json())
         .then(data=>{Setarr(data.marks);console.log("data",data,"\n","data.marks:",data.marks)})
        .catch(err=>{console.log(err.message);Setarr([])});
   }
   useEffect(()=>{
    fetcher();
   },[])
//=====================================================================================================================

   const handleDelete =async(name)=>{
    try{
        const res = fetch(`http://localhost:8000/update-mark/${name}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
            },
        });
        fetcher();
    }
    catch(e){
        console.log(e.message);
    }

}
//=====================================================================================================================

    const HandlePut = async(name) => {
        try{
            const res = await fetch(`http://localhost:8000/update-mark/${name}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    Name: EditName,
                    s1: Edits1 || 0,  
                    s2: Edits2 || 0,
                    s3: Edits3 || 0,
                    s4: Edits4 || 0,
                    s5: Edits5 || 0 
                })
            });
           
            const data = await res.json();
            if(!res.ok){
                console.log("unable to send data for putting (frontend)");
                throw new Error("Http Error");
            }
            console.log("updating values are:", Name,s1,s2,s3,s4,s5);
            fetcher();
        }
        catch(e){
            console.log(e.message);
        }
    }
    
    const handleSubmit =async(data)=>{
        try{
            const res = fetch('http://localhost:8000/update-mark',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                   Name,s1,s2,s3,s4,s5
                })
            });
           
            const data = await res.json();
            if(!res.ok){
                throw new Error("Http Error");
            }
            fetcher();
        }
        catch(e){
            console.log(e.message);
        }
    }
    function ArrSetter(){
        
        Setarr(a=>[...a,{
            name:Name,
            english:Number(s1),
            tamil:Number(s2),
            maths:Number(s3),
            physics:Number(s4),
            chemistry:Number(s5)
        }]);
        handleSubmit()

    }
    useEffect(()=>{
        Sets1("");
        Sets2("");
        Sets3("");
        Sets4("");
        Sets5("");
        SetName("");
    },[arr])
    useEffect(()=>{

        console.log(Name);
    },[Name]);
    function checker(){
        if(s1!=""  && s2!=""  && s3!=""  && s4!=""  && s5!=""  && Name!="" ){
            return true
        }
        return false
    }

    function handleEdit(name,english,tamil,maths,physics,chemistry){
        SetIsPopup(true);
        SetEdits1(english);
        SetEdits2(tamil);
        SetEdits3(maths);
        SetEdits4(physics);
        SetEdits5(chemistry);
        SetEditName(name);
        SetIdName(name)
    }
    function Handleclose(){
        SetIsPopup(false);
        SetEdits1(0);
        SetEdits2(0);
        SetEdits3(0);
        SetEdits4(0);
        SetEdits5(0);
        SetEditName("");
        SetIdName("");
        
    }

    return(<>
    
  
    <table>
        <thead>
       <tr>
        <th>Name</th>
        <th>English</th>
        <th>Tamil</th>
        <th>Maths</th>
        <th>Physics</th>
        <th>Chemistry</th>
        <th>Submit</th>
        </tr>
        </thead>
<tbody>
    <tr>
    <td><input type="number" className="iname " max={100} value={Name} placeholder="EnterName" onChange={(e)=>{SetName(e.target.value)}}/></td>
    <td><input type="Number" className="i1" placeholder="EnterMark" max={100} min={0} value={s1} onChange={(e)=>{(parseInt(e.target.value)<=100)?Sets1(parseInt(e.target.value)):Sets1(0)}}/></td>

    <td><input type="Number" className="i2" placeholder="EnterMark" max={100} min={0} value={s2} onChange={(e)=>{(parseInt(e.target.value)<=100)?Sets2(parseInt(e.target.value)):Sets2(0)}}/></td>
    <td><input type="Number" className="i3"placeholder="EnterMark"  max={100} min={0} value={s3} onChange={(e)=>{(parseInt(e.target.value)<=100)?Sets3(parseInt(e.target.value)):Sets3(0)}}/></td>
    <td><input type="Number" className="i4" placeholder="EnterMark" max={100} min={0} value={s4} onChange={(e)=>{(parseInt(e.target.value)<=100)?Sets4(parseInt(e.target.value)):Sets4(0)}}/></td>
    <td><input type="Number" className="i5"placeholder="EnterMark"  max={100} min={0} value={s5} onChange={(e)=>{(parseInt(e.target.value)<=100)?Sets5(parseInt(e.target.value)):Sets5(0)}}/></td>

    <td><button className="btn btn-danger"onClick={()=>checker()?ArrSetter( ):()=>{}}>Submit</button></td>
    </tr>
</tbody> 
    </table>
    
    <h1>Marks List</h1>

    <table>
        <thead>
       <tr>
        <th>Name</th>
        <th>English</th>
        <th>Tamil</th>
        <th>Maths</th>
        <th>Physics</th>
        <th>Chemistry</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
        </thead>


        <tbody>
            <>
            {Array.isArray(arr) && arr.length>0 && [...arr].map((a,index)=>(
                <tr key={a.name}>
                    <td>{a.name}</td>
                    {/* <td>{a.name}</td> */}
                    <td>{a.english}</td>
                    <td>{a.tamil}</td>
                    <td>{a.maths}</td>
                    <td>{a.physics}</td>
                    <td>{a.chemistry}</td>
                    <td><button className="btn btn-danger" onClick={()=>handleEdit(a.name,a.english,a.tamil,a.maths,a.physics,a.chemistry)}>Edit</button></td>
                    <td><button className="btn btn-danger" onClick={()=>handleDelete(a.name)}>delete</button></td>
                </tr>
            ))}
           </>
           
        </tbody>
        </table>


   { IsPopup &&   <div className="Popup">
<form style={{width:"80%",margin:"auto"}}>
    <h1>Enter New Marks</h1>
  <div className="mb-3"><input type="text" className="form-control" placeholder="Enter Name" max={100} value={EditName}  onChange={(e)=>{SetEditName(e.target.value)}}/></div>
  <div className="mb-3"><input type="number" className="form-control" placeholder="Enter English Mark" max={100} min={0} value={Edits1} onChange={(e)=>{(parseInt(e.target.value)<=100)?SetEdits1(parseInt(e.target.value)):SetEdits1(0)}}/></div>
  <div className="mb-3"><input type="number" className="form-control" placeholder="Enter Tamil Mark"max={100} min={0} value={Edits2} onChange={(e)=>{(parseInt(e.target.value)<=100)?SetEdits2(parseInt(e.target.value)):SetEdits2(0)}}/></div>
  <div className="mb-3"><input type="number" className="form-control" placeholder="Enter Physics Mark"max={100} min={0} value={Edits3} onChange={(e)=>{(parseInt(e.target.value)<=100)?SetEdits3(parseInt(e.target.value)):SetEdits3(0)}}/></div>
  <div className="mb-3"><input type="number" className="form-control" placeholder="Enter Chemistry Mark"max={100} min={0} value={Edits4} onChange={(e)=>{(parseInt(e.target.value)<=100)?SetEdits4(parseInt(e.target.value)):SetEdits4(0)}}/></div>
  <div className="mb-3"><input type="number" className="form-control" placeholder="Enter Maths Mark"max={100} min={0} value={Edits5} onChange={(e)=>{(parseInt(e.target.value)<=100)?SetEdits5(parseInt(e.target.value)):SetEdits5(0)}}/></div>
<div className="button">
  <button type="submit" className="btn btn-danger" onClick={Handleclose}>Close</button>
  <button type="submit" className="btn btn-success" onClick={()=>HandlePut(EditName)}>Submit</button>
</div>
</form>
       </div>}
    </>)
}

export default Form;