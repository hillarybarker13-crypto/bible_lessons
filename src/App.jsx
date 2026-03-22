
import { useState, useEffect } from "react";

const verseMap={
 "Jeremiah 29:11":"For I know the plans I have for you, declares the Lord, plans to prosper you..."
};

export default function App(){
 const [name,setName]=useState("");
 const [step,setStep]=useState(1);
 const [age,setAge]=useState(8);
 const [mode,setMode]=useState("home");
 const [openVerse,setOpenVerse]=useState("");
 const [prayers,setPrayers]=useState([]);
 const [newPrayer,setNewPrayer]=useState("");
 const [showTutorial,setShowTutorial]=useState(true);

 useEffect(()=>{
  const saved=localStorage.getItem("prayers");
  if(saved) setPrayers(JSON.parse(saved));
 },[]);

 useEffect(()=>{
  localStorage.setItem("prayers",JSON.stringify(prayers));
 },[prayers]);

 const addPrayer=()=>{
  if(!newPrayer.trim()) return;
  setPrayers([...prayers,{
    text:newPrayer,
    answered:false,
    date:null,
    top:Math.random()*70+"%",
    left:Math.random()*70+"%",
    rotate:(Math.random()*6-3)+"deg"
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

 if(step===1){
  return <div style={{padding:40}}>
   <h2>Welcome 🤍</h2>
   <input placeholder="Enter your name..." value={name} onChange={e=>setName(e.target.value)} />
   <button onClick={()=>setStep(2)}>Continue</button>
  </div>;
 }

 if(step===2){
  return <div style={{padding:40}}>
   <h2>Hi {name}</h2>
   <input type="range" min="2" max="100" value={age} onChange={e=>setAge(e.target.value)} />
   <p>{age}</p>
   <button onClick={()=>setStep(3)}>Continue</button>
  </div>;
 }

 return (
 <div style={{padding:20}}>

  {showTutorial && (
   <div style={{position:"fixed",top:"30%",left:"50%",transform:"translateX(-50%)",
   background:"#fff",padding:20,borderRadius:10}}>
    <h3>Tutorial</h3>
    <p>Add prayers + tap notes to mark answered</p>
    <button onClick={()=>setShowTutorial(false)}>Got it</button>
   </div>
  )}

  <h1>Bible Plan</h1>

  <button onClick={()=>setMode("bible")}>Bible plan</button>
  <button onClick={()=>setMode("board")}>Prayer board</button>

  {mode==="bible" && (
   <div>
    <h2 onClick={()=>setOpenVerse("Jeremiah 29:11")}>Jeremiah 29:11</h2>
    {openVerse && <p>{verseMap[openVerse]}</p>}
   </div>
  )}

  {mode==="board" && (
   <div>
    <input value={newPrayer} onChange={e=>setNewPrayer(e.target.value)} />
    <button onClick={addPrayer}>Add</button>

    <div style={{
     height:400,
     background:"#d6a77a",
     borderRadius:20,
     position:"relative"
    }}>
     {prayers.map((p,i)=>(
      <div key={i} onClick={()=>toggleAnswered(i)} style={{
       position:"absolute",
       top:p.top,
       left:p.left,
       transform:`rotate(${p.rotate})`,
       background:"#fff3b0",
       padding:10,
       borderRadius:8,
       cursor:"pointer"
      }}>
       <div style={{
        width:10,height:10,background:"red",borderRadius:"50%",
        position:"absolute",top:-5,left:"50%",transform:"translateX(-50%)"
       }}/>
       {p.answered && <div style={{position:"absolute",top:4,right:6,color:"green"}}>✓</div>}
       <div>{p.text}</div>
       {!p.answered && <small>tap to mark answered</small>}
       {p.answered && <small>answered {p.date}</small>}
      </div>
     ))}
    </div>
   </div>
  )}

 </div>
 );
}
