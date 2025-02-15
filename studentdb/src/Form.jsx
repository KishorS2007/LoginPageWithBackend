import { useEffect, useState } from "react";

function Form(){

    const [s1,Sets1] = useState(0);
    const [s2,Sets2] = useState(0);
    const [s3,Sets3] = useState(0);
    const [s4,Sets4] = useState(0);
    const [s5,Sets5] = useState(0);
    const [Name,SetName] = useState("");
    // const [db,Setdb] = useState([])

    const [arr,Setarr] = useState([]);

   const fetcher = ()=>{
        fetch('http://localhost:8000/studentmark').then(res=>res.json())
         .then(data=>{Setarr(data.marks);console.log("data",data,"\n","data.marks:",data.marks)})
        .catch(err=>{console.log(err.message);Setarr([])});
   }
   useEffect(()=>{
    fetcher();
   },[])
    
    const handleSubmit =async(data)=>{
        try{
            const res = fetch('http://localhost:8000/update-mark',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    Name: Name.trim(), // Prevents accidental spaces
                    s1: Number(s1), // Ensures values are numbers
                    s2: Number(s2),
                    s3: Number(s3),
                    s4: Number(s4),
                    s5: Number(s5),
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
        // console.log(arr);
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
    <td><input type="text" className="iname " max={100} value={Name} placeholder="EnterName" onChange={(e)=>{SetName(e.target.value)}}/></td>
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
        </tr>
        </thead>


        <tbody>
            <>
            {Array.isArray(arr) && arr.length>0 && [...arr].map((a,index)=>(
                <tr key={index}>
                    <td>{a.name}</td>
                    <td>{a.english}</td>
                    <td>{a.tamil}</td>
                    <td>{a.maths}</td>
                    <td>{a.physics}</td>
                    <td>{a.chemistry}</td>
                </tr>
            ))}
           </>
           
        </tbody>
        </table>
       
    </>)
}

export default Form;