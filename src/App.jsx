
import { useState } from "react";

const colors = {
 bg: "#fdf6f0",
 card: "#ffffff",
 accent: "#e8cfc1",
 text: "#5a4a42",
 button: "#c89f94"
};

const verseMap = {
 "Jeremiah 29:11":
 "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
};

export default function App() {
 const [step,setStep]=useState(1);
 const [name,setName]=useState("");
 const [age,setAge]=useState("");
 const [openVerse,setOpenVerse]=useState("");
 const [prayers,setPrayers]=useState([]);
 const [newPrayer,setNewPrayer]=useState("");
 const [mood,setMood]=useState("");

 const verse="Jeremiah 29:11";

 const cardStyle={
  background:colors.card,
  padding:20,
  borderRadius:16,
  boxShadow:"0 4px 10px rgba(0,0,0,0.05)",
  marginBottom:20
 };

 if(step===1){
  return <div style={{background:colors.bg,minHeight:"100vh",padding:40}}>
   <div style={cardStyle}>
    <h2 style={{color:colors.text}}>Welcome 🤍</h2>
    <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}
     style={{padding:10,width:"100%",marginTop:10}}/>
    <button onClick={()=>setStep(2)}
     style={{marginTop:15,background:colors.button,color:"#fff",padding:10,border:"none",borderRadius:10}}>
     Next
    </button>
   </div>
  </div>;
 }

 if(step===2){
  return <div style={{background:colors.bg,minHeight:"100vh",padding:40}}>
   <div style={cardStyle}>
    <h2 style={{color:colors.text}}>Hi {name}</h2>
    <input placeholder="Age" value={age} onChange={e=>setAge(e.target.value)}
     style={{padding:10,width:"100%",marginTop:10}}/>
    <button onClick={()=>setStep(3)}
     style={{marginTop:15,background:colors.button,color:"#fff",padding:10,border:"none",borderRadius:10}}>
     Enter
    </button>
   </div>
  </div>;
 }

 return (
  <div style={{background:colors.bg,minHeight:"100vh",padding:30,fontFamily:"Arial"}}>

   <div style={cardStyle}>
    <h1 style={{color:colors.text}}>Bible Plan</h1>

    <button onClick={()=>setOpenVerse(openVerse===verse?"":verse)}
     style={{color:colors.button,background:"none",border:"none",fontSize:18,cursor:"pointer"}}>
     {verse}
    </button>

    {openVerse===verse && <p style={{marginTop:10,color:colors.text}}>
      {verseMap[verse]}
    </p>}
   </div>

   <div style={cardStyle}>
    <h2 style={{color:colors.text}}>Mood Check</h2>
    {["😞","😐","🙂","😄"].map(m=>(
      <button key={m} onClick={()=>setMood(m)} style={{marginRight:10,fontSize:20}}>{m}</button>
    ))}
    {mood && <p style={{marginTop:10}}>You selected: {mood}</p>}
   </div>

   <div style={cardStyle}>
    <h2 style={{color:colors.text}}>Prayer Board</h2>
    <input value={newPrayer} onChange={e=>setNewPrayer(e.target.value)}
     style={{padding:10,width:"70%"}}/>
    <button onClick={()=>{
      if(!newPrayer.trim())return;
      setPrayers([...prayers,newPrayer]);
      setNewPrayer("");
    }} style={{marginLeft:10,padding:10,background:colors.button,color:"#fff",border:"none",borderRadius:10}}>
      Add
    </button>

    <div style={{marginTop:15}}>
      {prayers.map((p,i)=>(
        <div key={i} style={{
          background:colors.accent,
          padding:12,
          marginBottom:10,
          borderRadius:12
        }}>
          {p}
        </div>
      ))}
    </div>
   </div>

  </div>
 );
}
