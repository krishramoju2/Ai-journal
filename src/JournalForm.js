import React, { useState } from "react";

function JournalForm() {
  const [text, setText] = useState("");

  const summarize = async (input) => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Summarize this and detect mood:\n${input}`,
          },
        ],
        max_tokens: 60,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const summary = await summarize(text);

    const newEntry = {
      id: Date.now(),
      text,
      summary,
      timestamp: new Date().toLocaleString(),
    };

    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entries.push(newEntry);
    localStorage.setItem("entries", JSON.stringify(entries));
    setText("");
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your journal entry..."
        rows="5"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default JournalForm;
