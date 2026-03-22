import React, { useState } from "react";

const verseMap = {
  "Jeremiah 29:11": "For I know the plans I have for you,” declares the Lord...",
  "Philippians 4:6-7": "Do not be anxious about anything...",
  "Isaiah 40:31": "But those who hope in the Lord will renew their strength.",
  "2 Corinthians 5:7": "For we walk by faith, not by sight.",
};

function App() {
  const [openVerse, setOpenVerse] = useState("");

  const verse = "Jeremiah 29:11";

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h2>Lesson</h2>

      <p
        style={{ fontWeight: "bold", cursor: "pointer" }}
        onClick={() =>
          setOpenVerse(openVerse === verse ? "" : verse)
        }
      >
        {verse}
      </p>

      {openVerse === verse && (
        <p>{verseMap[verse]}</p>
      )}
    </div>
  );
}

export default App;
