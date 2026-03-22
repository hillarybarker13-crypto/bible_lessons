
import { useState, useEffect } from "react";

export default function App(){
 const [prayers,setPrayers]=useState([]);
 const [newPrayer,setNewPrayer]=useState("");

 useEffect(()=>{
  const saved = localStorage.getItem("prayers");
  if(saved) setPrayers(JSON.parse(saved));
 },[]);

 useEffect(()=>{
  localStorage.setItem("prayers", JSON.stringify(prayers));
 },[prayers]);

 const addPrayer=()=>{
  if(!newPrayer.trim())return;
  setPrayers([...prayers,{
    text:newPrayer,
    answered:false,
    date:null,
    rotate:(Math.random()*6-3)+"deg",
    top:Math.random()*70+"%",
    left:Math.random()*70+"%"
  }]);
  setNewPrayer("");
 };

 const toggleAnswered=(i)=>{
  const copy=[...prayers];
  if(!copy[i].answered){
    copy[i].answered=true;
    copy[i].date=new Date().toLocaleDateString();
  }
  setPrayers(copy);
 };

 return (
 <div style={{padding:30}}>

  <h1>Prayer Board</h1>

  <input value={newPrayer} onChange={e=>setNewPrayer(e.target.value)}/>
  <button onClick={addPrayer}>Add</button>

  <div style={{
    height:400,
    borderRadius:20,
    position:"relative",
    background:"#d6a77a",
    backgroundImage:"radial-gradient(#c18b5c 1px, transparent 1px)",
    backgroundSize:"10px 10px"
  }}>

   {prayers.map((p,i)=>(
    <div key={i} onClick={()=>toggleAnswered(i)} style={{
      position:"absolute",
      top:p.top,
      left:p.left,
      transform:`rotate(${p.rotate})`,
      background:"#fff3b0",
      padding:12,
      borderRadius:8,
      cursor:"pointer"
    }}>

      {/* push pin */}
      <div style={{
        width:10,height:10,background:"red",borderRadius:"50%",
        position:"absolute",top:-5,left:"50%",transform:"translateX(-50%)"
      }}/>

      {/* checkmark */}
      {p.answered && (
        <div style={{
          position:"absolute",
          top:4,
          right:6,
          color:"green",
          fontWeight:"bold"
        }}>✓</div>
      )}

      <div>{p.text}</div>

      {!p.answered && <small>tap to mark answered</small>}

      {p.answered && <small>answered {p.date}</small>}

    </div>
   ))}

  </div>

 </div>
 );
}
