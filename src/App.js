import React from "react";
import JournalForm from "./JournalForm";
import JournalTimeline from "./JournalTimeline";
import "./index.css";

function App() {
  return (
    <div className="App">
      <h1>📝 AI-Powered Journal</h1>
      <JournalForm />
      <JournalTimeline />
    </div>
  );
}

export default App;
