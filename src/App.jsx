
import { useState, useEffect } from "react";

const verseMap = {
  "Jeremiah 29:11": "For I know the plans I have for you...",
  "Romans 8:28": "All things work together for good..."
};

export default function App() {
  const [openVerse, setOpenVerse] = useState("");
  const [prayers, setPrayers] = useState([]);
  const [newPrayer, setNewPrayer] = useState("");

  useEffect(()=>{
    const saved = localStorage.getItem("prayers");
    if(saved) setPrayers(JSON.parse(saved));
  },[]);

  useEffect(()=>{
    localStorage.setItem("prayers", JSON.stringify(prayers));
  },[prayers]);

  const addPrayer=()=>{
    if(!newPrayer) return;
    setPrayers([...prayers,{text:newPrayer}]);
    setNewPrayer("");
  };

  return (
    <div style={{padding:20}}>
      <h2
        onClick={()=>setOpenVerse(openVerse?"":"Jeremiah 29:11")}
        style={{cursor:"pointer"}}
      >
        Jeremiah 29:11
      </h2>

      {openVerse && <p>{verseMap["Jeremiah 29:11"]}</p>}

      <input value={newPrayer} onChange={e=>setNewPrayer(e.target.value)} />
      <button onClick={addPrayer}>Add</button>

      {prayers.map((p,i)=><div key={i}>{p.text}</div>)}
    </div>
  );
}
