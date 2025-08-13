
import { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import downloadIcon from "./images/download.svg";

function App() {
  const [text, setText] = useState("");
  const [textArr, setTextArr] = useState([]);
  const [date, setDate] = useState(null); 
  const hasLoaded = useRef(false);
  const [backupArr, setBackupArr] = useState([]);
  const [display,setDisplay]=useState("none")
 const [Message,setMessage]=useState("");

  function IsPastDate(taskDate) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return new Date(taskDate) < currentDate;
  }

  
  useEffect(() => {
    try {
      const savedTask = localStorage.getItem("tasks");
      console.log("Loading tasks from localStorage:", savedTask);
      if (savedTask) {
        const parsed = JSON.parse(savedTask);
        if (Array.isArray(parsed)) {
          setTextArr(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse tasks from localStorage:", e);
    }
    hasLoaded.current = true; 
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return; 
    try {
      localStorage.setItem("tasks", JSON.stringify(textArr));
     
    } catch (e) {
      console.error("Failed to save tasks to localStorage:", e);
    }
  }, [textArr]);

  const handleSubmit = () => {
    const noSpecialChars = /^[A-Za-z0-9\s]+$/;

    if (text.trim().length <= 5) {
      setMessage("Type something more than 5 characters");
      return;
    }
    if (!noSpecialChars.test(text)) {
      setMessage("Special characters not allowed");
      return;
    }
    if (!date) {
      setMessage("Select date");
      return;
    }
   

  
    const formattedDate = date.toISOString().split("T")[0];
    const newTaskAndDate = { text, date: formattedDate, completed: false };

    const newSortedTaskAndDate = [newTaskAndDate, ...textArr].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    setTextArr(newSortedTaskAndDate);
    setText("");
    setDate(null);
    setDisplay("none")
  };

  return (
 <>

<div
  style={{
    backgroundColor: "white",
    color: "#0077cc",
    textAlign: "center",
    fontFamily: "'Orbitron', monospace",
    fontWeight: "900",
    fontSize: "clamp(24px, 6vw, 56px)", 
    letterSpacing: "clamp(2px, 1vw, 8px)",
    textTransform: "uppercase",
    userSelect: "none",
    padding: "20px",
    borderRadius: "16px",
    border: "3px solid #00aaff",
    boxShadow: "0 0 18px rgba(0, 122, 204, 0.45)",
    textShadow: "0 0 8px rgba(0, 119, 204, 0.7)",
    margin: "20px auto",
    maxWidth: "100%",
    wordBreak: "break-word",
    boxSizing: "border-box"
  }}
>
  TO DO APP
</div>


<div
  className=" p-4 border rounded"
  style={{
    width: "100vw",
    maxWidth: "90vw",
    padding: "10px",
    borderRadius: "100px",
    border: "1px solid #cce7ff",
    boxShadow:
      "0 8px 30px rgba(0, 123, 255, 0.15), 0 4px 10px rgba(0, 0, 0, 0.05)",
    background: "linear-gradient(135deg, #f9fbff, #e3f0ff)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    boxSizing: "border-box",
   minHeight:'450px',
    maxHeight: "80vh", // 
    overflowY: "auto", // 
  }}
>





<h2 style={{ display: display }}>

  <span
    style={{
      display: "inline-block",
      animation: "typingDots 1.2s infinite"
    }}
  >
    •••
  </span>

  <style>
    {`
      @keyframes typingDots {
        0% { opacity: 0.2; }
        20% { opacity: 1; }
        100% { opacity: 0.2; }
      }
    `}
  </style>
</h2>

<div className="row g-3 align-items-center mb-4">
  <div className="col-12 col-md-6">
    <input
  type="text"
  className="form-control"
  placeholder="Type Something"
  value={text}
  onChange={(e) => { 
    setText(e.target.value);

    if (e.target.value !== "") {
      setDisplay("block"); 
    } else {
      setDisplay("none"); 
    }
  }}
  required
/>

  </div>

  <div
    className="col-12 col-md-6"
    style={{ display: "flex", gap: "1rem", alignItems: "center" }}
  >
    <DatePicker
      selected={date}
      onChange={(d) => setDate(d)}
      placeholderText="Select a date"
      dateFormat="dd-MM-yyyy"
      className="form-control"
      style={{
        height: "calc(2em + 2rem + 1px)",
        padding: "12px 16px",
        fontSize: "1.25rem",
        boxSizing: "border-box",
        flex: 1,
        zIndex:'1000',
       
      }}
    />

<button
      className="btn rounded-3 shadow-sm"
      onClick={handleSubmit}
      style={{
        fontFamily: "'Orbitron', monospace",
        fontWeight: "700",
        fontSize: "1.1rem",
        backgroundColor: "#007bff",
        border: "none",
        color: "#fff",
        boxShadow: "0 4px 12px rgba(0, 123, 255, 0.6)",
        padding: "10px 24px",
        letterSpacing: "1.1px",
        textTransform: "uppercase",
        cursor: "pointer",
        transition:
          "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#0056b3";
        e.target.style.boxShadow = "0 6px 20px rgba(0, 86, 179, 0.8)";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#007bff";
        e.target.style.boxShadow = "0 4px 12px rgba(0, 123, 255, 0.6)";
        e.target.style.transform = "scale(1)";
      }}
    >
      ADD
    </button>

    
  
  </div>


</div>

  <div className="list-group">
    {textArr.map((items, index) => (
      <div
        key={items}
        className="list-group-item d-flex flex-wrap align-items-center gap-3 mt-4"
      style={{
    backgroundColor: items.completed ? "#f8f9fa" : "white",
    borderRadius: "10px",
    padding: "18px 24px",
    boxShadow: "0 6px 18px rgba(0, 122, 204, 0.08)",
    transition: "background-color 0.3s ease",
    border: `2px solid ${
      items.completed
        ? "rgba(235, 177, 30, 1)"
        : IsPastDate(items.date)
        ? "red"
        : "#e1e7f0"
    }`,
  }}
      >
        <div
          className="flex-grow-1 d-flex flex-column mb-1"
          style={{ maxWidth: "60vw", margin: "0 10px 0 0" }}
        >
          <p
            className={`mb-1 text-break`}
            style={{
              color: items.completed
                ? "gray"
                : IsPastDate(items.date)
                ? "#dc3545"
                : "#292121ff",
              textDecoration: items.completed ? "line-through" : "none",
              fontWeight: 600,
              fontSize: "1.15rem",
              marginBottom: "6px",
   
              
            }}
          >
            {items.text}
          </p>
          <small
            style={{
              color: items.completed
                ? "green"
                : IsPastDate(items.date)
                ? "#dc3545"
                : "#198754",
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            {items.completed
              ? "Completed"
              : IsPastDate(items.date)
              ? "Overdue"
              : "Upcoming"}
          </small>
        </div>

        <p
          className="mb-1"
          style={{
            color: IsPastDate(items.date) ? "#dc3545" : "#212529",
            fontWeight: 600,
            minWidth: "100px",
            textAlign: "center",
            userSelect: "none",
            marginRight: "10px",
            whiteSpace: "nowrap",
          }}
        >
          {items.date}
        </p>

        <div
          className="d-flex gap-2"
          style={{ minWidth: "180px", flexWrap: "nowrap" }}
        >
          <button
            className="btn btn-outline-danger btn-sm rounded-pill px-3"
            style={{ flex: "1 1 auto", fontWeight: 600 }}
            onClick={() => {
              setTextArr(textArr.filter((_, i) => i !== index));
            }}
          >
            Delete
          </button>

          <button
            className={`btn btn-sm rounded-pill px-3 ${
              items.completed ? "btn-secondary" : "btn-success"
            }`}
            style={{ flex: "1 1 auto", fontWeight: 600 }}
            onClick={() => {
              setTextArr(
                textArr.map((task, idx) =>
                  idx === index
                    ? { ...task, completed: !task.completed }
                    : task
                )
              )
              
             if(borderColor==="") setBorderColor("yellow")
              else setBorderColor("")
              ;
            }}
          >
            {items.completed ? "Undo" : "Complete"}
          </button>
        </div>
      </div>
    ))}
  </div>
     <div style={{display:'flex',justifyContent:'center'}}>
<button
  onClick={function () {
    if (textArr.length > 0) {
      
      setBackupArr(textArr);
      setTextArr([]);
    } else {
    
      setTextArr(backupArr);
    }
  }}
  style={{
    fontFamily: "'Orbitron', monospace",
    fontWeight: "700",
    fontSize: "1.1rem",
    backgroundColor: "rgba(239, 44, 44, 1)",
    border: "none",
    color: "#fff",
     boxShadow: "0 6px 18px rgba(0, 122, 204, 0.08)",
    padding: "10px 24px",
    letterSpacing: "1.1px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition:
      "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease",
    whiteSpace: "nowrap",
    borderRadius: "30px",
    marginTop: "30px",
    display: textArr.length === 0 && backupArr.length === 0 ? "none" : "inline-block"
  }}
>
  {textArr.length > 0 ? "Delete All" : "Undo All"}
</button>
</div>
      
</div>
<div
  style={{
    position: "fixed",
    top: "50%",
    left: "50%", 
    transform: "translate(-50%, -50%)", 
    height: "20vh",
    width: "80vw",
    maxWidth: "400px",
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    padding: "50px",
    textAlign: "center",
    cursor: "pointer",
    color: "red",
    zIndex: 1000,
    display: Message ? "block" : "none",
  }}
  onClick={function () {
    setMessage("");
  }}
>
  {Message}
  <img
    src={downloadIcon}
    alt="Download"
    style={{ width: "30px", height: "30px", marginLeft: "10px" }}
  />
</div>
</>
  );
}

export default App;  