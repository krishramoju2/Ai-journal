import React from "react";

function JournalTimeline() {
  const entries = JSON.parse(localStorage.getItem("entries") || "[]").reverse();

  return (
    <div>
      <h2>🕰️ Your Timeline</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="entry">
          <p><strong>{entry.timestamp}</strong></p>
          <p>{entry.text}</p>
          <p><em>{entry.summary}</em></p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default JournalTimeline;
