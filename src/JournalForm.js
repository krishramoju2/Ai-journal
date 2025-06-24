import React, { useState } from 'react';

const JournalForm = () => {
  const [entry, setEntry] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: entry }),
      });

      const data = await res.json();
      if (data.choices) {
        setResponse(data.choices[0].message.content);
      } else {
        setResponse('Error: ' + JSON.stringify(data));
      }
    } catch (err) {
      setResponse('Fetch error: ' + err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          style={{ width: '100%' }}
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your journal..."
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Submit'}
        </button>
      </form>
      {response && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f0f0' }}>
          <h4>AI Reflection:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default JournalForm;
