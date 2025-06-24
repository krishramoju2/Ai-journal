// src/JournalForm.js
import { useState } from 'react';

function JournalForm() {
  const [entry, setEntry] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: entry })
    });

    const data = await res.json();
    if (data.choices) {
      setResponse(data.choices[0].message.content);
    } else {
      setResponse('Error: ' + JSON.stringify(data));
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Submit'}
        </button>
      </form>
      {response && <p><strong>AI:</strong> {response}</p>}
    </div>
  );
}

export default JournalForm;
